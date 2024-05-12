export interface Pet {
  id: number
  created_at: string
  owner_id: string
  pet_name: string
  pet_image: string
  age: number
  breed: string
}

export interface DietPlan {
  id: number
  pet_id: number
  weight: number
  food_type: string
  remarks: string
  created_at: string
  calorie: number
}

