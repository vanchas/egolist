import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { getLocations, showAlert, getDesiresInfo, getCategories, getSubcategories, getCities, getDesireById } from '../redux/actions/appActions'
import { getMyDesires, updateDesire, deleteDesirePhoto } from '../redux/actions/userActions'
import UpdateForm from '../components/update-desire/UpdateDesireForm'
import {authenticationService} from "../_services/authentication.service";
import Router from "next/router";
import s from '../components/update-desire/update-desire.module.scss'

function UpdateDesire(props) {
  const [showPage, setShowPage] = useState(false)

  useEffect(() => {
    const user = authenticationService.currentUserValue;
    if (user && user.user) {
      setShowPage(true)
    } else Router.push('/login')
    props.getMyDesires();
    props.getDesiresInfo();
    props.getCategories();
  }, []);

  return (
    <div className={s.update_page}>{showPage &&
    <UpdateForm
        desire={props.desire}
        getDesireById={props.getDesireById}
        types={props.types}
        priorities={props.priorities}
        categories={props.categories}
        subcategories={props.subcategories}
        cities={props.cities}
        showAlert={props.showAlert}
        locations={props.locations}
        updateDesire={props.updateDesire}
        myDesires={props.myDesires}
        getSubcategories={props.getSubcategories}
        getCities={props.getCities}
        deleteDesirePhoto={props.deleteDesirePhoto}
    />
    }</div>
  )
}

const mapStateToProps = state => ({
  locations: state.app.locations,
  myDesires: state.user.myDesires,
  cities: state.app.cities,
  categories: state.app.categories,
  subcategories: state.app.subcategories,
  types: state.app.desiresInfo.types,
  priorities: state.app.desiresInfo.priorities,
  desire: state.app.desire
})

const mapDispatchToProps = {
  getLocations,
  showAlert,
  getMyDesires,
  updateDesire,
  getDesiresInfo,
  getCategories,
  getSubcategories,
  getCities,
  getDesireById,
  deleteDesirePhoto
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDesire);