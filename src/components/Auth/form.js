const Form = (props) => {
  const { formTitle, click, children, changeInput } = props;

  return (
    <>
      <i className="fa fa-user fa-login"></i>
      <form action="">
        <h2>{formTitle}</h2>

        <div className="input-box">
          <input
            type="email"
            placeholder=" "
            name="email"
            id={`${formTitle.toLowerCase()}-email`}
            autoComplete="off"
            required
            onChange={(e) => changeInput(e, "email", formTitle.toLowerCase())}
            value={props.emailValue}
          />
          <label htmlFor="name" className="input-label">
            <span className="input-label-content">Email</span>
          </label>
        </div>
        <p className="p-error">{props.emailError}</p>
        <div className="input-box">
          <input
            placeholder=" "
            name="password"
            id={`${formTitle.toLowerCase()}-password`}
            type="password"
            autoComplete="off"
            required
            onChange={(e) =>
              changeInput(e, "password", formTitle.toLowerCase())
            }
            value={props.passValue}
          />
          <label htmlFor="name" className="input-label">
            <span className="input-label-content">Password</span>
          </label>
        </div>
        <p className="p-error">{props.passwordError}</p>
        {children}
        <input
          className="btn-auth"
          type="submit"
          value="Submit"
          onClick={click}
        />
      </form>
    </>
  );
};

export default Form;
