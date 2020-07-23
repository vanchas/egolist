import { getMyComplaints } from "../redux/actions/userActions";
import { getCities } from "../redux/actions/actions";
import MyComplaints from "../components/cabinet/MyComplaints";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { authenticationService } from "../_services/authentication.service";
import UpdateProfile from "../components/cabinet/UpdateProfile";
import Success from "../components/helpers/Success";
import Alert from "../components/helpers/Alert";
import Router from "next/router";
import s from "../components/cabinet/cabinet.module.scss";

function Cabinet(props) {
  const [showPage, setShowPage] = useState(false);
  const [visibleComponent, setVisibleComponent] = useState(<UpdateProfile />);
  const [activeBtn, setActiveBtn] = useState("update info");

  useEffect(() => {
    const user = authenticationService.currentUserValue;
    if (user.token && user.user) {
      setShowPage(true);
      props.getMyComplaints(user.user.id);
    } else Router.push("/login");
  }, []);

  const changeVisibleComponent = (ref) => {
    if (ref === "complaints") {
      setActiveBtn("complaints");
      setVisibleComponent(<MyComplaints myComplaints={props.myComplaints} />);
    } else if (ref === "update info") {
      setActiveBtn("update info");
      setVisibleComponent(<UpdateProfile />);
    }
  };

  return (
    <div className={s.cabinet_page}>
      {showPage && (
        <>
          {props.success && <Success />}
          {props.alert && <Alert />}

          <div>
            <span
              className={`btn m-1 ${
                activeBtn === "update info" ? "btn-secondary" : "btn-dark"
              }`}
              onClick={() => changeVisibleComponent("complaints")}
            >
              Мои жалобы
            </span>
            <span
              className={`btn m-1 ${
                  activeBtn === "complaints" ? "btn-secondary" : "btn-dark"
              }`}
              onClick={() => changeVisibleComponent("update info")}
            >
              Редактировать информацию о себе
            </span>
          </div>

          {visibleComponent}
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  myComplaints: state.user.myComplaints,
  success: state.app.success,
  alert: state.app.alert,
});

const mapDispatchToProps = {
  getMyComplaints,
  getCities,
};
export default connect(mapStateToProps, mapDispatchToProps)(Cabinet);
