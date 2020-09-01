import React, { useEffect, useState } from "react";
import s from "./add-form.module.scss";
import { useRouter } from "next/router";
import inputValidateHandler from "../../utils/FieldsValidator";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SpinnerGrow from "../helpers/SpinnerGrow";
import { connect } from "react-redux";
import { checkUniquenessOfLotDescription } from "../../redux/actions/userActions";

function AddLotForm({
  createOffer,
  showAlert,
  categories,
  subcategories,
  getSubcategories,
  locations,
  cities,
  getCities,
  currencies,
  checkUniquenessOfLotDescription,
  uniqueDescriptionRate,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");
  const [category1, setCategory1] = useState(null);
  const [category2, setCategory2] = useState(null);
  const [subcategory1, setSubcategory1] = useState(null);
  const [subcategory2, setSubcategory2] = useState(null);
  const [price, setPrice] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [isActive, setIsActive] = useState(0);
  const [showSubSelect1, setShowSubSelect1] = useState(false);
  const [showSubSelect2, setShowSubSelect2] = useState(false);
  const [subcategory1Loading, setSubcategory1Loading] = useState(false);
  const [subcategory2Loading, setSubcategory2Loading] = useState(false);
  const [regionLoading, setRegionLoading] = useState(false);
  const [warning, setWarning] = useState(null);
  const [currency, setCurrency] = useState(1);

  const videoValidator = (videoValue) => {
    const regExp = /^(https:\/\/www\.)?youtube\.com\/[aA-zZ0-9\/+*.$^?=&-]*$/m;
    if (!videoValue || videoValue === "null" || videoValue.match(regExp)) {
      return true;
    } else {
      return false;
    }
    return false;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (videoValidator(video)) {
      if (
        title.trim().length &&
        description.trim().length &&
        category1 &&
        subcategory1 &&
        price > 0
      ) {
        setLoading(true);
        createOffer(
          router.query.desire_id,
          photos,
          video,
          description,
          title,
          price,
          [category1 ? category1.id : null, category2 ? category2.id : null],
          [
            subcategory1 ? subcategory1.id : null,
            subcategory2 ? subcategory2.id : null,
          ],
          region,
          city ? city : cities[0].id,
          isActive,
          currency ? currency : 1
        );
        setTitle("");
        setPhotos([]);
        setVideo("");
        setDescription("");
        setCategory1(null);
        setCategory2(null);
        setSubcategory1(null);
        setSubcategory2(null);
        setPrice("");
        setIsActive(1);
        setCurrency(1);
        setTimeout(() => setLoading(false), 10000);
      } else {
        showAlert("Bce поля должны быть заполнены");
      }
    }
  };

  useEffect(() => {
    if (subcategories.length) {
      setSubcategory1Loading(false);
      setSubcategory2Loading(false);
    }
    setTimeout(() => setWarning(null), 10000);
  }, [warning, subcategories]);

  const category1Handler = (category) => {
    if (JSON.parse(category).id !== 1) {
      setSubcategory1Loading(true);
      setShowSubSelect1(true);
    }
    setCategory1(JSON.parse(category));
    getSubcategories(JSON.parse(category).id);
  };
  const category2Handler = (category) => {
    if (JSON.parse(category).id !== 1) {
      setSubcategory2Loading(true);
      setShowSubSelect2(true);
    }
    getSubcategories(JSON.parse(category).id);
    setCategory2(JSON.parse(category));
  };

  const locationSelectHandler = (e) => {
    if (+e.target.value !== 1) {
      setRegionLoading(true);
      getCities(e.target.value);
    }
    setRegion(e.target.value);
  };

  const handleChange = ({ fileList }) => setPhotos(fileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Загрузить</div>
    </div>
  );

  return (
    <div className={s.add_lot_form}>
      <span className={s.btn_back} onClick={() => router.back()}>
        &lt; Назад
      </span>
      <h3>Создание предложения</h3>
      {warning && (
        <div className="alert alert-danger" role="alert">
          {warning}
        </div>
      )}
      <form onSubmit={submitHandler}>
        <div>
          <label>Заголовок *</label>
          <input
            name={`header`}
            type="text"
            value={title}
            maxLength={`50`}
            required
            className="form-control"
            onChange={(e) => {
              if (inputValidateHandler(e, setWarning)) setTitle(e.target.value);
            }}
          />
          <label>Фото</label>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={photos}
            onChange={handleChange}
          >
            {photos.length >= 8 ? null : uploadButton}
          </Upload>
          {/*{[1, 2, 3, 4, 5, 6, 7, 8].map((input, i) => (*/}
          {/*  <input*/}
          {/*    key={i}*/}
          {/*    type="file"*/}
          {/*    onChange={(e) => setPhotos([...photos, e.target.files[0]])}*/}
          {/*  />*/}
          {/*))}*/}
          <label htmlFor="video">Видео (YouTube)</label>
          <input
            type="url"
            value={video}
            placeholder="https:// ...."
            id="video"
            className="form-control"
            onChange={(e) => setVideo(e.target.value)}
          />
          <label>
            Описание * &nbsp;{" "}
            {Number.isInteger(uniqueDescriptionRate) ? (
              <b className={`float-right`}>
                Уникальность текста
                <div className="progress">
                  <div
                    className="progress-bar bg-info"
                    role="progressbar"
                    style={{ width: uniqueDescriptionRate + "%" }}
                    aria-valuenow={uniqueDescriptionRate}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
                {uniqueDescriptionRate}%
              </b>
            ) : null}
          </label>
          <textarea
            name={`description`}
            required
            maxLength={`1000`}
            value={description}
            className="form-control"
            rows="10"
            onChange={(e) => {
              if (inputValidateHandler(e, setWarning))
                setDescription(e.target.value);
            }}
            onBlur={(e) => {
              checkUniquenessOfLotDescription(e.target.value);
            }}
          />
        </div>
        <div>
          <fieldset>
            <legend>Выберите категорию *</legend>
            {!categories || !categories.length ? (
              <SpinnerGrow color="secondary" />
            ) : category1 ? (
              <div>
                Выбрана категория {category1.name}
                <span
                  className={`btn btn-danger ml-2 px-1 py-0`}
                  onClick={() => {
                    setCategory1(null);
                    setSubcategory1(null);
                    setShowSubSelect1(false);
                  }}
                >
                  X
                </span>
              </div>
            ) : (
              <select
                required
                className="form-control"
                onChange={(e) => category1Handler(e.target.value)}
              >
                <option value="default" hidden>
                  первая категория
                </option>
                {categories && categories.length
                  ? categories.map((c, i) => (
                      <option key={i} value={JSON.stringify(c)}>
                        {c.name}
                      </option>
                    ))
                  : null}
              </select>
            )}
            {!subcategories.length && subcategory1Loading ? (
              <SpinnerGrow color="secondary" />
            ) : (
              showSubSelect1 &&
              (subcategory1 ? (
                <div>
                  Выбрана подкатегория {subcategory1.name}
                  <span
                    className={`btn btn-danger ml-2 px-1 py-0`}
                    onClick={() => {
                      setSubcategory1(null);
                    }}
                  >
                    X
                  </span>
                </div>
              ) : (
                <select
                  required
                  className="form-control"
                  onChange={(e) => setSubcategory1(JSON.parse(e.target.value))}
                >
                  <option value="default" hidden>
                    первая подкатегория
                  </option>
                  {subcategories && subcategories.length
                    ? subcategories.map((s, i) => (
                        <option key={i} value={JSON.stringify(s)}>
                          {s.name}
                        </option>
                      ))
                    : null}
                </select>
              ))
            )}
            <br />
            {!categories || !categories.length ? (
              <SpinnerGrow color="secondary" />
            ) : category2 ? (
              <div>
                Выбрана категория {category2.name}
                <span
                  className={`btn btn-danger ml-2 px-1 py-0`}
                  onClick={() => {
                    setCategory2(null);
                    setSubcategory2(null);
                    setShowSubSelect2(false);
                  }}
                >
                  X
                </span>
              </div>
            ) : (
              <select
                className="form-control"
                onChange={(e) => category2Handler(e.target.value)}
              >
                <option value="default" hidden>
                  вторая категория
                </option>
                {categories && categories.length
                  ? categories.map((c, i) => (
                      <option key={i} value={JSON.stringify(c)}>
                        {c.name}
                      </option>
                    ))
                  : null}
              </select>
            )}
            {!subcategories && subcategory2Loading ? (
              <SpinnerGrow color="secondary" />
            ) : (
              showSubSelect2 &&
              (subcategory2 ? (
                <div>
                  Выбрана подкатегория {subcategory2.name}
                  <span
                    className={`btn btn-danger ml-2 px-1 py-0`}
                    onClick={() => {
                      setSubcategory2(null);
                    }}
                  >
                    X
                  </span>
                </div>
              ) : (
                <select
                  className="form-control"
                  onChange={(e) => setSubcategory2(JSON.parse(e.target.value))}
                >
                  <option value="default" hidden>
                    первая подкатегория
                  </option>
                  {subcategories && subcategories.length
                    ? subcategories.map((s, i) => (
                        <option key={i} value={JSON.stringify(s)}>
                          {s.name}
                        </option>
                      ))
                    : null}
                </select>
              ))
            )}
          </fieldset>
          <fieldset>
            <legend>Выберите область*</legend>
            {!locations || !locations.length ? (
              <SpinnerGrow color="secondary" />
            ) : (
              <select
                required
                className="form-control"
                onChange={(e) => locationSelectHandler(e)}
              >
                <option value="default" hidden></option>
                {locations && locations.length
                  ? locations.map((c, i) => (
                      <option key={i} value={c.id}>
                        {c.name_ru}
                      </option>
                    ))
                  : null}
              </select>
            )}
            {!cities.length && regionLoading ? (
              <SpinnerGrow color="secondary" />
            ) : (
              <select
                required
                className="form-control"
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="default" hidden>
                  Города
                </option>
                {cities && cities.length && +region !== 1
                  ? cities.map((s, i) => (
                      <option key={i} value={s.id}>
                        {s.name_ru}
                      </option>
                    ))
                  : null}
              </select>
            )}
          </fieldset>
          <label htmlFor="price">
            Цена{" "}
            {currencies && currencies.length ? (
              <select onChange={(e) => setCurrency(e.target.value)}>
                {currencies.map((cur, i) => (
                  <option key={i} value={cur.id}>
                    {cur.name}
                  </option>
                ))}
              </select>
            ) : (
              <SpinnerGrow color={`secondary`} />
            )}{" "}
            *
          </label>
          <input
            type="number"
            id="price"
            min={`1`}
            max={`999999999999`}
            maxLength={12}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
            required
          />
          <label>
            <input
              type="checkbox"
              onChange={() => {
                if (isActive) {
                  setIsActive(0);
                } else setIsActive(1);
              }}
            />
            Сделать Активным
          </label>
          <div className="d-flex">
            <button type="submit" className="ml-2 btn btn-secondary">
              Опубликовать
            </button>
            {loading && (
              <div className="text-center py-2 pl-4">
                <SpinnerGrow color="secondary" />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currencies: state.app.currencies,
  uniqueDescriptionRate: state.user.uniqueDescriptionRate,
});
const mapDispatchToProps = {
  checkUniquenessOfLotDescription,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddLotForm);
