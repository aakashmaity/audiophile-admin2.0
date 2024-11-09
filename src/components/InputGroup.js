import { useState } from "react";

export default function InputGroup({
  label,
  name,
  value,
  onChange,
  type = "text",
  className
}) {
    
    const [toggleView, setToggleView] = useState(false)


    function togglePasswordView(e){
        e.preventDefault();
        setToggleView(!toggleView)
        
    }
  return (
    <div className="relative flex mt-4 z-0 w-full group rounded-lg border-2 focus-within:border-sky-200 px-3 pb-0 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
      <input
        type={type === "password" ? toggleView ? "text" : "password" : "text"}
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${className} `+"peer block mt-1 py-2.5 px-1 text-gray-400 appearance-none w-full border-0 bg-transparent p-0 font-medium file:my-1 placeholder:text-muted-foreground/90 focus:outline-none sm:leading-7 text-foreground"}
        placeholder=" "
      />
      <label
        htmlFor={name}
        className="text-gray-400 absolute font-medium duration-300 text-muted-foreground group-focus-within:text-white text-gray-40 transform -translate-y-3.5 scale-75 top-5 -z-10 origin-[0] peer-focus:left-4 peer-focus:scale-75 peer-focus:-translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
      >
        {label}
      </label>

      {
        type === "password" && (
          <button
            onClick={togglePasswordView}
            className="absolute right-2 top-2 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-0 focus:ring-sky-300/30"
          >
            {toggleView? "hide" : "show"}
          </button>
        )
      }
      {/* <span>
        <svg className="block" width="30px" height="30px" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path clip-rule="evenodd" d="M22.6928 1.55018C22.3102 1.32626 21.8209 1.45915 21.6 1.84698L19.1533 6.14375C17.4864 5.36351 15.7609 4.96457 14.0142 4.96457C9.32104 4.96457 4.781 7.84644 1.11993 13.2641L1.10541 13.2854L1.09271 13.3038C0.970762 13.4784 0.967649 13.6837 1.0921 13.8563C3.79364 17.8691 6.97705 20.4972 10.3484 21.6018L8.39935 25.0222C8.1784 25.4101 8.30951 25.906 8.69214 26.1299L9.03857 26.3326C9.4212 26.5565 9.91046 26.4237 10.1314 26.0358L23.332 2.86058C23.553 2.47275 23.4219 1.97684 23.0392 1.75291L22.6928 1.55018ZM18.092 8.00705C16.7353 7.40974 15.3654 7.1186 14.0142 7.1186C10.6042 7.1186 7.07416 8.97311 3.93908 12.9239C3.63812 13.3032 3.63812 13.8561 3.93908 14.2354C6.28912 17.197 8.86102 18.9811 11.438 19.689L12.7855 17.3232C11.2462 16.8322 9.97333 15.4627 9.97333 13.5818C9.97333 11.2026 11.7969 9.27368 14.046 9.27368C15.0842 9.27368 16.0317 9.68468 16.7511 10.3612L18.092 8.00705ZM15.639 12.3137C15.2926 11.7767 14.7231 11.4277 14.046 11.4277C12.9205 11.4277 12 12.3906 12 13.5802C12 14.3664 12.8432 15.2851 13.9024 15.3624L15.639 12.3137Z" fill="#fcfcfc" fill-rule="evenodd"></path><path d="M14.6873 22.1761C19.1311 21.9148 23.4056 19.0687 26.8864 13.931C26.9593 13.8234 27 13.7121 27 13.5797C27 13.4535 26.965 13.3481 26.8956 13.2455C25.5579 11.2677 24.1025 9.62885 22.5652 8.34557L21.506 10.2052C22.3887 10.9653 23.2531 11.87 24.0894 12.9239C24.3904 13.3032 24.3904 13.8561 24.0894 14.2354C21.5676 17.4135 18.7903 19.2357 16.0254 19.827L14.6873 22.1761Z" fill="#fcfcfc"></path></g></svg>
      </span> */}
    </div>
  );
}