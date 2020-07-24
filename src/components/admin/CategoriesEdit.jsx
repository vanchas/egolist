import React, {useEffect, useState} from 'react'
import {
    createCategory,
    createSubcategory,
    deleteCategory, deleteSubcategory,
    editCategory,
    editSubcategory,
} from "../../redux/actions/adminActions";
import {getCategories, getSubcategories} from "../../redux/actions/appActions";
import {connect} from "react-redux";
import s from './admin-category.module.scss'

function CategoriesEdit(props) {
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryId, setNewCategoryId] = useState("");
    const [newSubcategoryName, setNewSubcategoryName] = useState("");
    const [newSubcategoryId, setNewSubcategoryId] = useState("");

    useEffect(() => {
        props.getCategories()
    }, [])

    return (
        <div className={s.category_edit}>
            <div>
                <h3>Создать категорию</h3>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        props.createCategory(newCategoryName);
                        setNewCategoryName("");
                    }}
                >
                    <label>
                        Имя новой категории
                        <input
                            type="text"
                            className="form-control"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                        />
                    </label>
                    <button type="submit" className="btn btn-primary">
                        Сохранить
                    </button>
                </form>
            </div>
            <div>
                <h3>Изменить категорию</h3>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        props.editCategory(newCategoryId, newCategoryName);
                        setNewCategoryName("");
                        setNewCategoryId("");
                    }}
                >
                    <label>
                        Выберите категория для изменения
                        <select
                            className="form-control"
                            onChange={(e) => setNewCategoryId(e.target.value)}
                        >
                            <option value="default" hidden></option>
                            {props.categories && props.categories.length
                                ? props.categories.map((cat, i) => (
                                    <option value={cat.id} key={i}>
                                        {cat.name}
                                    </option>
                                ))
                                : null}
                        </select>
                    </label>
                    <label>
                        Новое имя категории
                        <input
                            type="text"
                            className="form-control"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                        />
                    </label>
                    <button type="submit" className="btn btn-primary">
                        Сохранить
                    </button>
                </form>
            </div>
            <div>
                <h3>Удалить категорию</h3>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        props.deleteCategory(newCategoryId);
                        setNewCategoryId("");
                    }}
                >
                    <label>
                        Выберите категорию
                        <select
                            className="form-control"
                            onChange={(e) => setNewCategoryId(e.target.value)}
                        >
                            <option value="default" hidden></option>
                            {props.categories && props.categories.length
                                ? props.categories.map((cat, i) => (
                                    <option value={cat.id} key={i}>
                                        {cat.name}
                                    </option>
                                ))
                                : null}
                        </select>
                    </label>
                    <button type="submit" className="btn btn-primary">
                        Сохранить
                    </button>
                </form>
            </div>
            <div>
                <h3>Создать подкатегорию</h3>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        props.createSubcategory(newCategoryId, newSubcategoryName);
                        setNewSubcategoryName("");
                        setNewCategoryId("");
                    }}
                >
                    <label>
                        Выберите категорию для новой подкатегории
                        <select
                            className="form-control"
                            onChange={(e) => setNewCategoryId(e.target.value)}
                        >
                            <option value="default" hidden></option>
                            {props.categories && props.categories.length
                                ? props.categories.map((cat, i) => (
                                    <option value={cat.id} key={i}>
                                        {cat.name}
                                    </option>
                                ))
                                : null}
                        </select>
                    </label>
                    <label>
                        Имя новой подкатегории
                        <input
                            type="text"
                            className="form-control"
                            value={newSubcategoryName}
                            onChange={(e) => setNewSubcategoryName(e.target.value)}
                        />
                    </label>
                    <button type="submit" className="btn btn-primary">
                        Сохранить
                    </button>
                </form>
            </div>
            <div>
                <h3>Изменить подкатегорию</h3>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        props.editSubcategory(
                            newSubcategoryId,
                            newCategoryId,
                            newSubcategoryName
                        );
                        setNewSubcategoryName("");
                        setNewCategoryId("");
                        setNewSubcategoryId("");
                    }}
                >
                    <label>
                        Выберите категорию для изменения подкатегории
                        <select
                            className="form-control"
                            onChange={(e) => {
                                props.getSubcategories(e.target.value);
                                setNewCategoryId(e.target.value);
                            }}
                        >
                            <option value="default" hidden></option>
                            {props.categories && props.categories.length
                                ? props.categories.map((cat, i) => (
                                    <option value={cat.id} key={i}>
                                        {cat.name}
                                    </option>
                                ))
                                : null}
                        </select>
                    </label>
                    <label>
                        Выберите подкатегорию для изменения
                        <select
                            className="form-control"
                            onChange={(e) => setNewSubcategoryId(e.target.value)}
                        >
                            <option value="default" hidden></option>
                            {props.subcategories && props.subcategories.length
                                ? props.subcategories.map((cat, i) => (
                                    <option value={cat.id} key={i}>
                                        {cat.name}
                                    </option>
                                ))
                                : null}
                        </select>
                    </label>
                    <label>
                        Новое имя подкатегории
                        <input
                            type="text"
                            className="form-control"
                            value={newSubcategoryName}
                            onChange={(e) => setNewSubcategoryName(e.target.value)}
                        />
                    </label>
                    <button type="submit" className="btn btn-primary">
                        Сохранить
                    </button>
                </form>
            </div>
            <div>
                <h3>Удалить подкатегорию</h3>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        props.deleteSubcategory(newSubcategoryId);
                        setNewSubcategoryId("");
                        setNewCategoryId("");
                    }}
                >
                    <label>
                        Выберите категорию для удаления подкатегории
                        <select
                            className="form-control"
                            onChange={(e) => {
                                props.getSubcategories(e.target.value);
                                setNewCategoryId(e.target.value);
                            }}
                        >
                            <option value="default" hidden></option>
                            {props.categories && props.categories.length
                                ? props.categories.map((cat, i) => (
                                    <option value={cat.id} key={i}>
                                        {cat.name}
                                    </option>
                                ))
                                : null}
                        </select>
                    </label>
                    <label>
                        Выберите подкатегорию для удаления
                        <select
                            className="form-control"
                            onChange={(e) => setNewSubcategoryId(e.target.value)}
                        >
                            <option value="default" hidden></option>
                            {props.subcategories && props.subcategories.length
                                ? props.subcategories.map((cat, i) => (
                                    <option value={cat.id} key={i}>
                                        {cat.name}
                                    </option>
                                ))
                                : null}
                        </select>
                    </label>
                    <button type="submit" className="btn btn-primary">
                        Сохранить
                    </button>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    categories: state.app.categories,
    subcategories: state.app.subcategories,
});

const mapDispatchToProps = {
    createCategory,
    createSubcategory,
    editCategory,
    editSubcategory,
    deleteCategory,
    deleteSubcategory,
    getCategories,
    getSubcategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesEdit);