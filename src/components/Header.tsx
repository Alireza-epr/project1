import headerStyle from "./Header.module.scss";

const Header = () => {
  return (
    <div className={` ${headerStyle.wrapper}`}>
      <div className={` ${headerStyle.contentWrapper}`}></div>
    </div>
  );
};

export default Header;
