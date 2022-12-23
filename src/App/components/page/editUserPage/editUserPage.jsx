import React, { useEffect, useState } from "react";
// import { useHistory, useParams } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQuality";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = () => {
    // const { userId } = useParams();
    // const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    // const [data, setData] = useState({
    //     name: "",
    //     email: "",
    //     profession: "",
    //     sex: "male",
    //     qualities: []
    // });
    const { currentUser, updateUser } = useAuth();
    const [data, setData] = useState(currentUser);
    const { professions } = useProfessions();
    const { qualities } = useQualities();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (professions && qualities) {
            setIsLoading(false);
        }
    }, []);
    const professionsList = Object.keys(professions).map((professionName) => ({
        label: professions[professionName].name,
        value: professions[professionName]._id
    }));
    const qualitiesList = Object.keys(qualities).map((optionName) => ({
        value: qualities[optionName]._id,
        label: qualities[optionName].name,
        color: qualities[optionName].color
    }));

    const getQualities = (elements) => {
        const qualitiesArray = [];
        if (elements) {
            for (const elem of elements) {
                for (const quality in qualities) {
                    if (elem === qualities[quality]._id) {
                        qualitiesArray.push({
                            value: qualities[quality]._id,
                            label: qualities[quality].name,
                            color: qualities[quality].color
                        });
                    }
                }
            }
        }

        return qualitiesArray;
    };
    const transformData = (data) => {
        console.log(data);
        const newArray = [];

        data.map((qual) => newArray.push(qual.value));

        return newArray;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        updateUser(data);
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [currentUser]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleChangeQual = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value.map((q) => {
                return q.value;
            })
        }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={professionsList}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={getQualities(data.qualities)}
                                options={qualitiesList}
                                onChange={handleChangeQual}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
