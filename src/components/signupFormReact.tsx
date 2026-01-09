import React from "react";
const cl = console.log.bind(console)

const SignupFormReact = ({ errorMessage }: { errorMessage: string | null }) => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [verifyPassword, setVerifyPassword] = React.useState("");
    const [showAdminField, setShowAdminField] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState<string | null>(null);
    
    
    const adminUsernames = React.useMemo(() => (import.meta.env.PUBLIC_ADMIN_USERNAMES ?? "").split(','), []);
  
    const handleUsernameChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUsername(value);
        setShowAdminField(adminUsernames.includes(value));
    }, [adminUsernames]);

    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        if (password !== verifyPassword) {
            e.preventDefault(); 
            setPasswordError("Las contraseñas no coinciden. Por favor, verifícalas.");
        }
    }, [password, verifyPassword]);

    return (
        <form
            id="signinForm"
            className="space-y-4 md:space-y-6"
            method="POST"
            action="/api/signup"
            onSubmit={handleSubmit}
        >
            <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Tu correo electrónico
                </label>
                <input
                    type="email"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                />
            </div>
            <div>
                <label htmlFor="verifypassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Verificar Password
                </label>
                <input
                    type="password"
                    name="verifypassword"
                    id="verifypassword"
                    placeholder="••••••••"
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                />
            </div>
                {
                    showAdminField && (
                        <div>
                            <label htmlFor="adminCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Código de Administrador
                            </label>
                            <input type="password" 
                            name="adminCode"
                            id="adminCode"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            />
                        </div>
                )}
                {errorMessage && (
                <div className="text-redCrayola text-sm" role="alert">
                    <span className="font-medium">{decodeURIComponent(errorMessage)}</span>
                </div>
                )}
                {passwordError && (
                <div className="text-redCrayola text-sm" role="alert">
                    <span className="font-medium">{passwordError}</span>
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