import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {supabase} from "@/lib/supabase.ts";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from 'react-router-dom';


function AddDietPlanModal({petId} : {petId: number | undefined}) {
  const navigate = useNavigate();
  const location = useLocation();
  const calculateCalorieIntake = (weight: number) => {
    if (weight <= 4.5) {
      return 400;
    } else if (weight < 13) {
      // Linear interpolation between (4.5, 400) and (13, 900)
      return 400 + ((weight - 4.5) * (900 - 400) / (13 - 4.5));
    } else if (weight < 27) {
      return 900 + ((weight - 13) * (1300 - 900) / (27 - 13));
    } else if (weight <= 32) {
      return 1300 + ((weight - 27) * (1700 - 1300) / (32 - 27));
    } else {
      return 1700; // For weights greater than 32 kg
    }
  }

  function calculateDryFoodAmount(weight: number) {
    if (weight >= 1 && weight <= 5.5) {
      return "⅓ - 1 cup of dry food";
    } else if (weight > 5.5 && weight <= 9) {
      return "1 - 1⅓ cup of dry food";
    } else if (weight > 9 && weight <= 11) {
      return "1⅓ - 2 cups of dry food";
    } else if (weight > 11 && weight <= 23) {
      return "2 - 2⅔ cups of dry food";
    } else if (weight > 23 && weight <= 34) {
      return "2⅔ - 3⅓ cups of dry food";
    } else {
      // For weights greater than 34 kg
      let cups = 3.33; // Initial value for 34 kg
      const extraWeight = weight - 34; // Calculate additional weight over 34 kg
      const extraCups = Math.ceil(extraWeight / 4.5) * 0.25; // Calculate extra cups
      cups += extraCups; // Add extra cups
      return cups.toFixed(2) + " - " + (cups + 1).toFixed(2) + " cups of dry food";
    }
  }

  const generateDietPlan = (weight: number, type: string) => {
    const caloriesNeeded = calculateCalorieIntake(weight);
    let remarks = "";

    if (type === 'mix') {
      if (weight >= 1 && weight <= 5.5) {
        remarks = "85 grams of wet food, mixed with about ¾ cup of dry food";
      } else if (weight > 5.5 && weight <= 9) {
        remarks = "85 grams of wet food, mixed with about ¾ - 1 cup of dry food";
      } else if (weight > 9 && weight <= 11) {
        remarks = "85 grams of wet food, mixed with about 1- 1¾ cups of dry food";
      } else if (weight > 11 && weight <= 23) {
        remarks = "170 grams of wet food, mixed with about 1½ - 2 cups of dry food";
      } else if (weight > 23 && weight <= 34) {
        remarks = "170 grams of wet food, mixed with about 2 - 3 cups of dry food";
      } else {
        remarks = "170 grams of wet food, mixed with about 2½ - 3 cups of dry food";
      }
    } else if (type === 'wet') {
      const adjustedAmount = 85 * Math.ceil(weight / 1.5);
      remarks = `${adjustedAmount} grams of wet food`;
    } else if (type === 'dry') {
      remarks = calculateDryFoodAmount(weight);
    }

    return {
      calories: caloriesNeeded,
      weight: weight,
      foodType: type,
      remarks: remarks
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const formData = new FormData(event.target);
    const weight = formData.get('weight') as string;
    const type = formData.get('type') as string;

    const dietPlan = generateDietPlan(parseFloat(weight), type);

    console.log(dietPlan)

    if (!petId) {
      toast.error("Pet ID is not defined");
      return;
    }

    const { data, error } = await supabase.from('diet_plans').insert({
      pet_id: petId,
      weight: dietPlan.weight,
      food_type: dietPlan.foodType,
      calorie: dietPlan.calories,
      remarks: dietPlan.remarks
    });

    if (error) {
      console.error(error);
      return;
    } else {
      console.log(data);
      navigate('/reload');
      setTimeout(() => {
        navigate(location.pathname);
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add a Diet Plan</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a New Diet Plan</DialogTitle>
          <DialogDescription>Fill out the form to calculate a new diet plan.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Pet Weight (in kg)</Label>
            <Input id="name" placeholder="Enter pet's weight (in kg)" name="weight" type="number"/>
          </div>
          <div>
            <Label htmlFor="name">Food Type</Label>
            <Select name="type">
              <SelectTrigger className="">
                <SelectValue placeholder="Food Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dry">Dry</SelectItem>
                <SelectItem value="wet">Wet</SelectItem>
                <SelectItem value="mix">Mix</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit">Calculate Diet Plan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddDietPlanModal;