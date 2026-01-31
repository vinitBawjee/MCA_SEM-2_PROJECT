import { account, databases } from "../../services/appwrite";
import { ID } from "appwrite";
import { setLoading, setUser, setError } from "./authSlice";


const generatePassword = (length = 10) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

export const registerUser = (userData) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const generatedPassword = generatePassword();


    const accountResponse = await account.create(
      ID.unique(),
      userData.email,
      generatedPassword
    );

    await account.createEmailPasswordSession(
      userData.email,
      generatedPassword
    );


    await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
      ID.unique(),
      {
        userId: accountResponse.$id,
        name: userData.name,
        email: userData.email,
        mobile: userData.mobile,
      }
    );

    dispatch(setUser(accountResponse));

  } catch (error) {
    dispatch(setError(error.message));
  }
};

