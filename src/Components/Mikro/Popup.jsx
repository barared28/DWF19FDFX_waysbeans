import { useEffect } from "react";

function Popup({
  text,
  type = "succsess",
  show = false,
  setShow,
  time = 3000,
}) {
  const timeOut = () => {
    if (show === true) {
      setTimeout(() => {
        setShow(false);
      }, time);
    }
  };

  useEffect(() => {
    timeOut();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={show ? "pop-up-container" : "none"}>
      <div className="item-center ">
        <div className="pop-up">
          <h5
            className={
              type === "succsess"
                ? "pop-up-text text-center pop-up-succsess"
                : "pop-up-text text-center pop-up-danger"
            }
          >
            {text}
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Popup;
