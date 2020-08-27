import React, { useEffect, useState } from "react";
import OffersList from "../components/my-offers/OffersList";
import { connect } from "react-redux";
import { getSortingValues } from "../redux/actions/appActions";
import {
  getMyOffers,
  hideShowOffer,
  sortMyOffers,
  deleteOffer,
} from "../redux/actions/userActions";
import { authenticationService } from "../_services/authentication.service";
import Router from "next/router";

function MyOffers({
  getMyOffers,
  hideShowOffer,
  sortMyOffers,
  getSortingValues,
  sortingValues,
  deleteOffer,
}) {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const user = authenticationService.currentUserValue;
    if (user && user.user) {
      setShowPage(true);
    } else Router.push("/login");
    getMyOffers();
    getSortingValues();
  }, []);

  return (
    <div className={`h-100`}>
      {showPage && (
        <OffersList
          deleteOffer={deleteOffer}
          sortingValues={sortingValues}
          hideShowOffer={hideShowOffer}
          sortMyOffers={sortMyOffers}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  sortingValues: state.app.sortingValues,
});

const mapDispatchToProps = {
  getMyOffers,
  hideShowOffer,
  sortMyOffers,
  getSortingValues,
  deleteOffer,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyOffers);
