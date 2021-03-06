import React, { useState, useEffect } from 'react'
import InterestingLot from './InterestingLot';
import s from './interesting-lots.module.scss'
import SignNew from '../../assets/lot/sign-new.png'
// import { CircularProgress } from '@material-ui/core'

export default function InterestingLotsList({ interestingDesires }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div className={`interesting-lots-list ${s.interesting_lots_list}`}>

      {interestingDesires && interestingDesires.length
        ? <>
          <ul >
            <img src={SignNew} alt="" className={s.interesting_img} />
            {interestingDesires.map((desire, i) => (
              <li key={i}><InterestingLot desire={desire} /></li>
            ))}
          </ul>
          {/*<div className={s.interesting_lots_list_control}>*/}
          {/*  <span>ВЫБРАТЬ</span>*/}
          {/*  <span>ОТПРАВИТЬ</span>*/}
          {/*  <span></span>*/}
          {/*  <span>ПОКАЗАТЬ ЕЩЕ</span>*/}
          {/*</div>*/}
        </>
        : <>
          {loading && <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>}
          {!loading && <div className="text-center h5 py-5">No interesting desires for selected offer...</div>}
        </>}

    </div>
  )
}
