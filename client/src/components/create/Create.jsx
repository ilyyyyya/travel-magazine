import React, {useState} from 'react';
import classes from './create.module.css';
import {AiOutlineCloseCircle} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {URL} from "../../App.js";

const Create = () => {

    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const [img, setImg] = useState("");
    const [place, setPlace] = useState("")
    const [type, setType] = useState("")
    const [price, setPrice] = useState(null);
    const [review, setReview] = useState(null);
    const [typeError, setTypeError] = useState(false)
    const navigate = useNavigate();
    const {token} = useSelector((state) => state.auth)


    const onChangeFileFirst = (e) => {
        setImg(e.target.files[0]);
    };

    const handleCloseImg = () => {
        setImg(null);
    }

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        const acceptableTypes = ['mountain', 'forest', 'sea', 'cruise']

        if(!acceptableTypes.includes(type)){
            setTypeError(true)
            setTimeout(() => {
                setTypeError(false)
            }, 1000 * 5)
            return
        }

        try {
            const formData = new FormData();

            let filename = null;
            if (img) {
                filename = Date.now() + img.name;

                formData.append("filename", filename);
                formData.append("image", img);

                await fetch(`${URL}/upload/image`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    method: "POST",
                    body: formData,
                });

                const res = await fetch(`${URL}/path`, {
                    headers: {
                        "Content-Type": `application/json`,
                        "Authorization": `Bearer ${token}`
                    },
                    method: "POST",
                    body: JSON.stringify({
                        title,
                        description,
                        price,
                        photo: filename,
                        type,
                        review,
                        place,
                    }),
                });
                const path = await res.json();
                navigate(`/typeDetail/${path?._id}`);
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <h2 className={classes.title}>Добавить маршрут</h2>
                <form onSubmit={handleCreateProduct} encType="multipart/form-data">
                    <div className={classes.inputWrapper}>
                        <label >Название маршрута: </label>
                        <input
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                            className={classes.input}
                            type="text"
                        />
                    </div>
                    <div className={classes.inputWrapper}>
                        <label >Описание: </label>
                        <input
                            name="desc"
                            onChange={(e) => setDesc(e.target.value)}
                            className={classes.input}
                            type="text"
                        />
                    </div>
                    <div className={classes.inputWrapper}>
                        <label >Город: </label>
                        <input
                            name="country"
                            onChange={(e) => setPlace(e.target.value)}
                            className={classes.input}
                            type="text"
                        />
                    </div>
                    <div className={classes.inputWrapper}>
                        <label >Тип маршрута: </label>
                        <input
                            name="type"
                            onChange={(e) => setType(e.target.value)}
                            className={classes.input}
                            type="text"
                        />
                    </div>
                    <div className={classes.inputWrapperImg}>
                        <label className={classes.FileInput} htmlFor="img" >
                            Изображение:<span>Загрузить</span>
                        </label>
                        <input
                            className={classes.input}
                            type="file"
                            filename="img"
                            id="img"
                            onChange={onChangeFileFirst}
                            placeholder="image..."
                            style={{ display: "none" }}
                        />
                        {img && <p className={classes.imageName}>{img.name} <AiOutlineCloseCircle onClick={() => handleCloseImg()} className={classes.closeIcon}/></p>}
                    </div>
                    <div className={classes.inputWrapper}>
                        <label >Цена: </label>
                        <input
                            step={1}
                            name="price"
                            onChange={(e) => setPrice(e.target.value)}
                            className={classes.input}
                            type="number"
                        />
                    </div>
                    <div className={classes.inputWrapper}>
                        <label >Оценка: </label>
                        <input
                            min={1}
                            max={5}
                            step={0.1}
                            name="stars"
                            onChange={(e) => setReview(e.target.value)}
                            className={classes.input}
                            type="number"
                        />
                    </div>
                    <div className={classes.buttonWrapper}>
                        <button className={classes.submitBtn} type="submit">
                            Добавить маршрут
                        </button>
                    </div>
                </form>
                {typeError &&
                    <div className={classes.errorMessage}>
                        Не тот тип маршрута!
                    </div>}
            </div>
        </div>
    );
};

export default Create;