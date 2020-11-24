import FormInput from './../components/FormInput';
import ConfirmPasswordInput from './../components/ConfirmPasswordInput';
 
export default function userForm({values, invalidFields, handleChange}) {
  console.log(invalidFields);
  const passwordFields = ['password', 'passwordConfirm'];
  let passwordFail = invalidFields.some(el => passwordFields.indexOf(el) !== -1);

    return( 
     <span className="formFields">
        <FormInput type={"text"} placeholder={"Email"} name={"email"} value={values.email} 
                    fail={invalidFields.includes("email")} handleChange={handleChange} />

        <FormInput type={"text"} placeholder={"Username"} name={"username"} value={values.username} 
                    fail={invalidFields.includes("username")} handleChange={handleChange} />

        <ConfirmPasswordInput type={"password"} fail={passwordFail}
                    placeholder={"Password"} placeholderConfirm={"Confirm password"}
                    name={"password"} nameConfirm={"passwordConfirm"} 
                    value={values.password} valueConfirm={values.passwordConfirm}
                    handleChange={handleChange}/>
      </span>
    )
}
