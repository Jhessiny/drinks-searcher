const Form = (props) => {
  const { formTitle, click, children } = props;
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
            id="email"
            type="text"
            autoComplete="off"
            required
            // value={props.emailValue}
          />
          <label for="name" class="input-label">
            <span class="input-label-content">Email</span>
          </label>
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder=" "
            name="password"
            id="password"
            type="text"
            autoComplete="off"
            required
            // onChange={(e) => changeInput()}
            // value={props.passValue}
          />
          <label for="name" class="input-label">
            <span class="input-label-content">Password</span>
          </label>
        </div>
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
