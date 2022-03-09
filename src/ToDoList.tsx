import React from "react";
import { useForm } from "react-hook-form";


interface IForm {
   email: string;
   firstName: string;
   lastName: string;
   username: string;
   password: string;
   password1: string;
 }
 

function ToDoList() {

   // const [toDo, setToDo] = useState("");
   // const onChange = (event: React.FormEvent<HTMLInputElement>) => {
   //    const {
   //       currentTarget: { value },
   //    } = event;
   //    setToDo(value);
   // };

   // const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
   //    event.preventDefault();
   //    console.log(toDo);
   // };


   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm<IForm>({
      defaultValues: {
         email: "@naver.com"
      }
   });
   const onValid = (data: any) => {
      console.log(data);
   };

   

   
   return (
      <div>
         <form
            style={{display: "flex", flexDirection: "column"}}
            onSubmit = {handleSubmit(onValid)}
         >
            <input 
               {...register("email", {
                  required: "Email is required",
                  pattern: {
                     value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                     message: "Only naver.com emails allowed",
                  },
               })} 
               placeholder="Email" 
            />
            <span>{errors?.email?.message}</span>
            <input 
               {...register("firstName", {required: "write here"})}
               placeholder="First Name" 
            />
            <span>{errors?.firstName?.message}</span>
            <input 
               {...register("lastName", {required: "write here"})}
               placeholder="Last Name" 
            />
            <span>{errors?.lastName?.message}</span>
            <input
               {...register("username", {required: "write here", minLength: 10})}
               placeholder="Username" 
            />
            <span>{errors?.username?.message}</span>
            <input {...register("password", {required: "write here"})} placeholder="Password" />
            <input 
               {...register("password1", {
                  required: "비밀번호를 꼭 입력해주세요.", 
                  minLength: {
                     value: 5,
                     message: "비밀번호가 너무 짧습니다."
                  }
               })} 
               placeholder="Password1" 
            />
            <span>{errors?.password1?.message}</span>
            <button>Add</button>
         </form>
      </div>
   )
}

export default ToDoList;