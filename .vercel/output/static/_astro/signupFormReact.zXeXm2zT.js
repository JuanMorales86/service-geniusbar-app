import{j as e}from"./jsx-runtime.CYYqVSlZ.js";import{R as r}from"./index.DJO9vBfz.js";const g=console.log.bind(console),y=({errorMessage:a})=>{g("Component rendering");const[o,n]=r.useState(""),[d,i]=r.useState(!1),[l,m]=r.useState([]);r.useEffect(()=>{(async()=>{const u=await(await fetch("/api/adminConfig")).json();m(u)})()},[]);const c=t=>{const s=t.target.value;n(s),i(l.includes(s))};return e.jsxs("form",{id:"signinForm",className:"space-y-4 md:space-y-6",method:"POST",action:"/api/signup",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"username",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Your username"}),e.jsx("input",{type:"text",name:"username",id:"username",value:o,onChange:c,className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"email@gmail.com",required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"password",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Password"}),e.jsx("input",{type:"password",name:"password",id:"password",placeholder:"••••••••",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",required:!0})]}),d&&e.jsx("input",{type:"password",name:"adminCode",placeholder:"Admin Code",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"}),a&&e.jsx("div",{className:"text-redCrayola text-sm",role:"alert",children:e.jsx("span",{className:"font-medium",children:decodeURIComponent(a)})}),e.jsx("button",{type:"submit",className:"w-full text-white bg-sky-esp focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800",children:"Sign Up"}),e.jsxs("p",{className:"text-sm font-light text-gray-500 dark:text-gray-400",children:["already have an account? ",e.jsx("a",{href:"/signin",className:"font-medium text-primary-600 hover:underline dark:text-primary-500",children:"Sign In"})]})]})};export{y as default};
