import React from "react";
const cl = console.log.bind(console)

const SignupFormReact = ({ errorMessage }: { errorMessage: string | null }) => {
    //cl('Component rendering');  // Add this line at the start
    const [username, setUsername] = React.useState("");
    const [showAdminField, setShowAdminField] = React.useState(false);
    const [adminUsers, setAdminUsers] = React.useState<string[]>([]);

    React.useEffect(() => {
        const getAdminUsers = async () => {
            const response = await fetch('/api/adminConfig');
            const data = await response.json();
            setAdminUsers(data);
        };
        
        getAdminUsers();
    }, []);
    //cl(adminUsers)
  
    const handleUsernameChange = (e: any) => {
        const value = e.target.value;
        setUsername(value);
        setShowAdminField(adminUsers.includes(value));
    };

    return (
        <form
            id="signinForm"
            className="space-y-4 md:space-y-6"
            method="POST"
            action="/api/signup"
        >
            <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your username
                </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="email@gmail.com"
                    required
                />
            </div>
            
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                />
            </div>
                {
                    showAdminField && (
                        <input type="password" 
                        name="adminCode"
                        placeholder="Admin Code"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        />
                )}
                {errorMessage && (
                <div className="text-redCrayola text-sm" role="alert">
                    <span className="font-medium">{decodeURIComponent(errorMessage)}</span>
                </div>
                )}

            <button
                type="submit"
                className="w-full text-white bg-sky-esp focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
            >
                Sign Up
            </button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                already have an account? <a
                  href="/signin"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >Sign In</a>
              </p>
           


        </form>
    )
}

export default SignupFormReact;