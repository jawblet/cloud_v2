import FormInput from './../components/FormInput';
import ConfirmPasswordInput from './../components/ConfirmPasswordInput';

export default function useForm(props) {
    return(
     <>
        <FormInput type={"text"} placeholder={"Email"} 
                    name={"email"} value={props.values.email} 
                    fail={props.invalidFields.includes("email")}
                    handleChange={props.handleChange} />

        <FormInput type={"text"} placeholder={"Username"} 
                    name={"username"} value={props.values.username} 
                    fail={props.invalidFields.includes("username")}
                    handleChange={props.handleChange} />

        <ConfirmPasswordInput type={"password"} 
                    fail={props.invalidFields.some(el => el === "password" || "passwordConfirm")}
                    placeholder={"Password"} placeholderConfirm={"Confirm password"}
                    name={"password"} nameConfirm={"passwordConfirm"}
                    value={props.values.password} valueConfirm={props.values.passwordConfirm}
                    handleChange={props.handleChange}/>
      </>
    )
}
