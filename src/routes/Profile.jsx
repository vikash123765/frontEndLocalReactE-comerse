// ... Other imports

import { storeAtom } from "../lib/store";
import { useAtom } from "jotai";
import { alterInfo, changePassword } from "../lib/api";
import '../style/profile.css';

import FormField from "../components/FormField";

export default function Profile() {
    const [store, setStore] = useAtom(storeAtom);

    const handleProfileForm = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
    
        // Check if required fields are empty
        if (!data.userName || !data.userEmail || !data.address || !data.phoneNumber) {
            alert('All fields are required');
            return;
        }
    
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.userEmail)) {
            alert('Please enter a valid email address');
            return;
        }
    
   
        // Update profile information
        try {
            const parsedResult = await alterInfo(data);
            console.log(parsedResult, "parsedResult")
    
            if (parsedResult && typeof parsedResult == 'object') {
                console.log('User information updated successfully');
                alert("User info changed successfully!");
    
                // Assuming your alterInfo API response contains updated user info
                const updatedUser = parsedResult;
                console.log("updatedUser", updatedUser);
                // Update the user state in the frontend
                // setStore({
                //     user: updatedUser,
                // });
    
                console.log("updatedUser", store);
            } else {
                if (parsedResult.error) {
                    console.error('API call failed:', parsedResult);
                    // Handle error here, e.g., show an error message to the user
                    alert("API call failed: " + parsedResult.error);
                } else {
                    console.error('Unexpected result from API:', parsedResult);
                    alert('Unexpected result from API');
                }
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error);
            alert("Something went wrong, please try again later");
        }
    };
    
    const handleChangePasswordForm = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));

        try {
            const result = await changePassword(
                data.oldPassword,
                data.newPassword,
                {
                    good: () => {
                        alert("Password changed successfully");
                        // Optionally, you can update other parts of the UI or state as needed
                    },
                    bad: (res) => {
                        alert("Password change failed");
                        console.log(res);
                    }
                }
            );

        } catch (error) {
            console.error('An unexpected error occurred:', error);
            // Handle unexpected errors here
        }
    };

    return (
        <section id="profile">
            {/* Profile change form */}
            <div id="address">
                <form onSubmit={handleProfileForm}>
                <FormField
                        label="User Name"
                        name="userName"
                        defaultValue={store.user?.userName}
                    />
                    <FormField
                        label="Your email"
                        name="userEmail"
                        defaultValue={store.user?.userEmail}
                    />
                     <FormField
                        label="Your address"
                        name="address"
                        defaultValue={store.user?.address}
                        type="textarea"
                        style={{ width: '100%', height: '8rem', boxSizing: 'border-box', resize: 'none' }}

                    />
       
                     <p>please eneter a phone number with country code and number with no spaces or +</p>
                    <FormField
                        label="Phone number"
                    
                        name="phoneNumber"
                        defaultValue={store.user?.phoneNumber ? `${store.user.phoneNumber}` : ''}
                    />
                    <label className="form-field">
                        <span>Gender</span>
                        <select name="gender">
                            <option value="MALE">
                                Male
                            </option>
                            <option value="FEMALE">
                                Female
                            </option>
                          
                        </select>
                    </label>

                    <button type="submit">Update my profile info</button>
                </form>
            </div>

            {/* Password change form */}
            <div id="change-password">
                <form onSubmit={handleChangePasswordForm}>
                    {/* Form fields for changing password */}
                    <FormField
                        label="Current password"
                        name="oldPassword"
                        type="password"
                    />
                    <FormField
                        label="New password"
                        name="newPassword"
                        type="password"
                    />
                    <button type="submit">Change password</button>
                </form>
            </div>
        </section>
    );
}