import './RegistrarCard.css'


function RegistrarCard({
    sensor,
    isAdmin,
    onDetails,
    onOrder,
    onEdit,
    onDelete,
}) {
    return (
        <article className="registrar-card">

            <div className="registrar-card__image-wrapper">

                <img
                    src={sensor.image}
                    alt={sensor.title}
                    className="registrar-card__image"
                />


                {isAdmin && (

                    <span className="registrar-card__admin-badge">
                        РЕДАКТИРОВАНИЕ
                    </span>

                )}

            </div>


            <div className="registrar-card__content">


                <div className="registrar-card__heading">

                    <h2>
                        {sensor.title}
                    </h2>

                    <span />

                </div>


                <p className="registrar-card__company">
                    {sensor.company}
                </p>


                <div className="registrar-card__summary">
    {sensor.summary && (
        <p>{sensor.summary}</p>
    )}
</div>


                <div className="registrar-card__actions">

                    <button
                        className="
                            registrar-card__button
                            registrar-card__button--secondary
                        "
                        onClick={() => onDetails(sensor)}
                    >
                        ПОДРОБНЕЕ
                    </button>


                    <button
                        className="
                            registrar-card__button
                            registrar-card__button--primary
                        "
                        onClick={() => onOrder(sensor)}
                    >
                        ЗАКАЗАТЬ
                    </button>

                </div>


                {isAdmin && (

                    <div className="registrar-card__admin-actions">

                        <button
                            className="
                                registrar-card__admin-button
                                registrar-card__admin-button--edit
                            "
                            onClick={() => onEdit(sensor)}
                        >
                            ИЗМЕНИТЬ
                        </button>


                        <button
                            className="
                                registrar-card__admin-button
                                registrar-card__admin-button--delete
                            "
                            onClick={() => onDelete(sensor)}
                        >
                            УДАЛИТЬ
                        </button>

                    </div>

                )}

            </div>

        </article>
    )
}


export default RegistrarCard
