import RegistrarCard from '../RegistrarCard/RegistrarCard'

import './CatalogGrid.css'


function CatalogGrid({
    sensors,
    isAdmin,
    onDetails,
    onOrder,
    onEdit,
    onDelete,
}) {
    return (
        <div className="catalog-grid">

            {sensors.map((sensor) => (

                <RegistrarCard
                    key={sensor.id}
                    sensor={sensor}
                    isAdmin={isAdmin}
                    onDetails={onDetails}
                    onOrder={onOrder}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />

            ))}

        </div>
    )
}


export default CatalogGrid
