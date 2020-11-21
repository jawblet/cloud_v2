import FormInput from './../components/FormInput';
import ConfirmPasswordInput from './../components/ConfirmPasswordInput';

export default function useForm(props) {
  console.log(props.invalidFields);
  const passwordFields = ['password', 'passwordConfirm'];
  const passwordFail = props.invalidFields.some(el => passwordFields.indexOf(el) !== -1);
    return( 
     <span className="formFields">
        <FormInput type={"text"} placeholder={"Email"} 
                    name={"email"} value={props.values.email} 
                    fail={props.invalidFields.includes("email")}
                    handleChange={props.handleChange} />

        <FormInput type={"text"} placeholder={"Username"} 
                    name={"username"} value={props.values.username} 
                    fail={props.invalidFields.includes("username")}
                    handleChange={props.handleChange} />

        <ConfirmPasswordInput type={"password"} fail={passwordFail}
                    placeholder={"Password"} placeholderConfirm={"Confirm password"}
                    name={"password"} nameConfirm={"passwordConfirm"}
                    value={props.values.password} valueConfirm={props.values.passwordConfirm}
                    handleChange={props.handleChange}/>
      </span>
    )
}
