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
import React from "react";
import {supabase} from "@/lib/supabase.ts";
import toast from "react-hot-toast";
import {useLocation, useNavigate} from "react-router-dom";
import {Pet} from "@/lib/types.ts";

type Props = {
  pet: Pet
}

export function EditPetModal(props: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
    };

    if(!newData.name || !newData.breed) {
      toast.error('Please fill out all fields')
      throw new Error('Missing fields')
    }

    console.log(newData)


    try {
      const { error } = await supabase
        .from('pets')
        .update({
          pet_name: newData.name,
          breed: newData.breed,
          age: newData.age,
        })
        .eq('id', props.pet.id);

      if (error) {
        toast.error("Failed to edit a record");
        return null;
      }

      navigate('/reload');
      setTimeout(() => {
        navigate(location.pathname);
      });
    } catch (error) {
      console.error('Unexpected error editing pet: ', error);
      return null;
    }
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Pet</DialogTitle>
          <DialogDescription>
            Fill out the form to edit pet's information.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Pet Name</Label>
            <Input id="name" placeholder="Enter pet's name" name="name" defaultValue={props.pet.pet_name}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="breed">Breed</Label>
            <Input id="breed" placeholder="Enter pet's breed" name="breed" defaultValue={props.pet.breed}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" placeholder="Enter pet's age" type="number" name="age" defaultValue={props.pet.age}/>
          </div>
          <DialogFooter>
            <Button type="submit">Save Pet</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
