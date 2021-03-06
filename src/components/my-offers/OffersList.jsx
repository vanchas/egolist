import React, { useState, useEffect } from "react";
import s from "./offers.module.scss";
import OfferCard from "./OfferCard";
import Router from "next/router";

export default function DesireRedList({
  myOffers,
  interestingDesires,
  getInterestingDesiresToOffer,
  hideShowOffer,
  sortMyOffers,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (myOffers && myOffers.length) {
      setLoading(false);
    }
    setTimeout(() => setLoading(false), 10000);
  }, []);

  return (
    <div className={s.offers_list}>
      <div className={s.offers_list_heading}>
        Вы сделали предложения на следующие лоты:
      </div>
      <div className={s.offers_list_sort}>
        <span className={s.btn_back} onClick={()=>Router.back()}>Назад</span>

        <select
          className="form-control"
          onChange={(e) => sortMyOffers(e.target.value)}
        >
          <option value="default" hidden>Сортировка</option>
          <option value="rating+">Rating from big to small</option>
          <option value="rating-">Rating from small to big</option>
          <option value="price+">Price from big to small</option>
          <option value="price-">Price from small to big</option>
        </select>
      </div>

      <div className={s.offers_list_items}>
        {myOffers && myOffers.length ? (
          <ul>
            {myOffers.map((offer, i) => {
              return (
                <li key={i}>
                  <OfferCard
                    hideShowOffer={hideShowOffer}
                    interestingDesires={interestingDesires}
                    offer={offer}
                    getInterestingDesiresToOffer={getInterestingDesiresToOffer}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={`text-center py-5`}>
            {loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div className="h5 py-5 text-center">У Вас нет активных предложений...</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
