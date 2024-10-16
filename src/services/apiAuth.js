import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: "" } },
  });

  if (error) throw new Error(error.message);
  console.log(data);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error("The was an error Login in");
  console.log(data);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  console.log("session", session);
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  console.log("data", data);

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ fullName, password, avatar }) {
  //1) update fullName or Password

  let updateData;

  if (fullName) updateData = { data: { fullName } };
  if (password) updateData = { password };

  const { data, error: error1 } = await supabase.auth.updateUser(updateData);

  if (error1) throw new Error(error1.message);

  if (!avatar) return data;

  //2) if avatar, upload avatar to storage
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  //3) update user with current avatar url from storage
  const { data: updatedUser, error: error3 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error3) throw new Error(error3.message);

  return updatedUser;
}
