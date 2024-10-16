import supabase, { supabaseUrl } from "./supabase";

//fetch cabin function. for our react query :)
export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Private Eror with cabins");
  }

  return cabins;
}

//delete cabin function
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error("Error deleting cabin:", error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}

//a function for but editting and creating a cabin. the (id) is only for editting :).
export async function createEditCabin(newCabin, id) {
  //just so we know if we are actually uploading a new image or using the already uploaded on when editing
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  //for creating imageUrl
  const cabinImage = newCabin.image;
  const imageName = `${Math.random()}-${cabinImage.name}`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //
  let query = supabase.from("cabins");
  //Creating a cabin row
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  //Editing a cabin row
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  //to get the  data and error, no matter if we are editting or creating a cabin
  const { data, error } = await query.select().single();

  //error. like yoou cant see it 0_0.
  if (error) {
    console.error(error);
    throw new Error("Couldnt create new cabin");
  }

  //
  if (hasImagePath) return data;

  //upload the  image to database storage
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabinImage);

  //delete the cabin  in case there was an error uploading the cabin image
  if (storageError) await supabase.from("cabins").delete().eq("id", data.id);

  return data;
}
