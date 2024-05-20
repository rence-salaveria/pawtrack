import { Button } from "@/components/ui/button"
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import React, {useState} from "react";
import {supabase} from "@/lib/supabase.ts";
import toast from "react-hot-toast";

export function AddPetModal() {

  const [photo, setPhoto] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhoto(e.target.files[0]);
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data: { user } } = await supabase.auth.getUser()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const formData = new FormData(event.target);

    const ageValue = formData.get('age');
    if(!ageValue) {
      toast.error('Please fill out all fields')
      throw new Error('Missing fields')
    }
    let age: number | null = null;

    if (typeof ageValue === 'string') {
      age = parseInt(ageValue, 10);
    }

    const newData = {
      name: formData.get('name') as string,
      breed: formData.get('breed') as string,
      age: age,
      photo: photo
    };

    if(!newData.name || !newData.breed) {
      toast.error('Please fill out all fields')
      throw new Error('Missing fields')
    }


    async function uploadPhoto(newData: { name: string; breed: string; age?: FormDataEntryValue | null; photo: never; }) {
      if (newData.photo) {
        const { data, error } = await supabase.storage.from('pet_images').upload(`${newData.name}-${newData.breed}-${new Date().toLocaleTimeString()}.png`, newData.photo)
        if (error) {
          toast.error('Failed to upload photo')
          throw new Error(error.message)
        } else {
          return data
        }
      } else {
        toast.error('Please select a photo')
        throw new Error('No photo selected')
      }
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const {fullPath} = await uploadPhoto(newData)

    const { error } = await supabase.from('pets').insert({
      owner_id: user!.id,
      pet_name: newData.name,
      breed: newData.breed,
      age: newData.age,
      pet_image: `https://dbprbdmabmwnvngzpkmn.supabase.co/storage/v1/object/public/${fullPath}`
    });

    if (error) {
      toast.error('Failed to add pet')
    } else {
      window.location.reload()
    }
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add a New Pet</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a New Pet</DialogTitle>
          <DialogDescription>Fill out the form to add a new pet to your account</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Pet Name</Label>
            <Input id="name" placeholder="Enter pet's name" name="name"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="breed">Breed</Label>
            <Input id="breed" placeholder="Enter pet's breed" name="breed"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" placeholder="Enter pet's age" type="number" name="age"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="photo">Photo</Label>
            <Input id="photo" type="file" onChange={handleFileChange}/>
          </div>
          <DialogFooter>
            <Button type="submit">Save Pet</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
