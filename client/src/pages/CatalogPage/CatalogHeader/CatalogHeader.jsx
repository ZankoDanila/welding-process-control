import './CatalogHeader.css'

function CatalogHeader({ count }) {
    return (
        <header className="catalog-header">

            <div className="catalog-header__title">
                <span className="catalog-header__line" />

                <h1>Каталог регистраторов</h1>
            </div>

            <p className="catalog-header__description">
                Разработки Белорусско-Российского университета
            </p>

            <div className="catalog-header__count">
                Доступно разработок: <strong>{count}</strong>
            </div>

        </header>
    )
}

export default CatalogHeader
