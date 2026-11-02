import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import CatalogHeader from './CatalogHeader/CatalogHeader'
import CatalogGrid from './CatalogGrid/CatalogGrid'

import api from '../../api/api'

import {
    addEquipment,
    readEquipment,
    updateEquipment,
    deleteEquipment,
    clearEquipmentError,
} from '../../store/slices/equipmentSlice'

import './CatalogPage.css'


function CatalogPage() {
    const dispatch = useDispatch()

    const sensors = useSelector(
        (state) => state.equipment.items
    )

    const equipmentError = useSelector(
        (state) => state.equipment.error
    )

    const validationErrors = useSelector(
        (state) => state.equipment.validationErrors
    )

    const isAdmin = useSelector(
        (state) => state.admin.isAdmin
    )

    const [selectedSensor, setSelectedSensor] = useState(null)
    const [isEditorOpen, setIsEditorOpen] = useState(false)
    const [editingSensor, setEditingSensor] = useState(null)

    const [form, setForm] = useState({
    title: '',
    company: '',
    image: '',
    logo: '',
    summary: '',
    advantages: '',
    productionManagement: '',
    capabilities: '',
})

const [formError, setFormError] = useState('')
const [apiError, setApiError] = useState('')
const [isSaving, setIsSaving] = useState(false)
const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
    async function loadSensors() {
        try {
            const response = await api.get('/sensors')

            dispatch(
                readEquipment(response.data || [])
            )
        } catch (error) {
            console.error(
                'Ошибка загрузки оборудования:',
                error
            )

            dispatch({
                type: 'equipment/readEquipment',
                payload: null,
            })
        } finally {
            setIsLoading(false)
        }
    }

    loadSensors()
}, [dispatch])


    // Открытие окна с подробной информацией
    function handleDetails(sensor) {
        setSelectedSensor(sensor)
    }


    // Закрытие окна с подробной информацией
    function handleCloseModal() {
        setSelectedSensor(null)
    }


    // Обработка заказа
    function handleOrder(sensor) {
        console.log(
            'Заказ регистратора:',
            sensor.title
        )
    }


    function handleAdd() {
    dispatch(clearEquipmentError())

    setEditingSensor(null)

    setForm({
        title: '',
        company: '',
        image: '',
        logo: '',
        summary: '',
        advantages: '',
        productionManagement: '',
        capabilities: '',
    })

    setFormError('')
    setApiError('')
    setIsEditorOpen(true)
}


function handleEdit(sensor) {
    dispatch(clearEquipmentError())

    setEditingSensor(sensor)

    setForm({
        title: sensor.title || '',
        company: sensor.company || '',
        image: sensor.image || '',
        logo: sensor.logo || '',
        summary: sensor.summary || '',
        advantages: sensor.advantages || '',
        productionManagement:
            sensor.productionManagement || '',
        capabilities: sensor.capabilities || '',
    })

    setFormError('')
    setApiError('')
    setIsEditorOpen(true)
}


function handleCloseEditor() {
    if (isSaving) {
        return
    }

    setIsEditorOpen(false)
    setEditingSensor(null)
    setFormError('')

    dispatch(clearEquipmentError())
}


    // Обработка изменений полей формы
    function handleFormChange(event) {
        const { name, value } = event.target

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }))
    }


    async function handleSubmit(event) {
    event.preventDefault()

    setFormError('')
    setApiError('')
    dispatch(clearEquipmentError())

    if (!form.title.trim()) {
        setFormError('Введите название оборудования.')
        return
    }

    if (!form.company.trim()) {
        setFormError('Введите организацию.')
        return
    }

    const sensorData = {
        title: form.title.trim(),
        company: form.company.trim(),
        image: form.image.trim() || '/img/sensor.png',
        logo: form.logo.trim() || null,
        summary: form.summary.trim(),
        advantages: form.advantages.trim(),
        productionManagement:
            form.productionManagement.trim(),
        capabilities: form.capabilities.trim(),
    }

    setIsSaving(true)

    try {
        if (editingSensor) {
            // Изменяем существующий регистратор в PostgreSQL
            const response = await api.put(
                `/sensors/${editingSensor.id}`,
                sensorData
            )

            // Сохраняем данные с сервера в Redux.
            // Объединение сохраняет, например, уже загруженные отзывы.
            const updatedSensor = {
                ...editingSensor,
                ...response.data,
            }

            dispatch(
                updateEquipment(updatedSensor)
            )

            if (selectedSensor?.id === updatedSensor.id) {
                setSelectedSensor(updatedSensor)
            }
        } else {
            // Создаём регистратор в PostgreSQL
            const response = await api.post(
                '/sensors',
                sensorData
            )

            // Добавляем в Redux именно запись,
            // которую вернул сервер с новым id
            dispatch(
                addEquipment(response.data)
            )
        }

        setIsEditorOpen(false)
        setEditingSensor(null)
        setFormError('')
    } catch (error) {
        console.error(
            'Ошибка сохранения оборудования:',
            error
        )

        setFormError(
            error.response?.data?.error ||
            'Не удалось сохранить оборудование. Проверьте подключение к серверу.'
        )
    } finally {
        setIsSaving(false)
    }
}


    async function handleDelete(sensor) {
    const confirmed = window.confirm(
        `Удалить оборудование «${sensor.title}»?`
    )

    if (!confirmed) {
        return
    }

    setApiError('')

    try {
        // Сначала удаляем запись из PostgreSQL
        await api.delete(`/sensors/${sensor.id}`)

        // Из Redux удаляем только после успеха сервера
        dispatch(
            deleteEquipment(sensor.id)
        )

        if (selectedSensor?.id === sensor.id) {
            setSelectedSensor(null)
        }
    } catch (error) {
        console.error(
            'Ошибка удаления оборудования:',
            error
        )

        setApiError(
            error.response?.data?.error ||
            'Не удалось удалить оборудование. Проверьте подключение к серверу.'
        )
    }
}


    if (isLoading) {
    return (
        <div className="catalog-page">
            <Header />

            <main className="catalog-main">
                <div className="catalog-status">
                    Загрузка каталога...
                </div>
            </main>

            <Footer />
        </div>
    )
}


    return (
        <div className="catalog-page">
            <Header />

            <main className="catalog-main">

                {/* Панель администратора */}
                {isAdmin && (
                    <div className="catalog-admin-bar">
                        <div>
                            <span className="catalog-admin-bar__label">
                                Режим администратора
                            </span>

                            <span className="catalog-admin-bar__text">
                                Управление каталогом оборудования
                            </span>
                        </div>

                        <button
                            className="catalog-admin-bar__add"
                            onClick={handleAdd}
                        >
                            + ДОБАВИТЬ ОБОРУДОВАНИЕ
                        </button>
                    </div>
                )}


                {(apiError || equipmentError) && (
    <div className="catalog-admin-error">
        {apiError || equipmentError}
    </div>
)}


                {/* Заголовок каталога */}
                <CatalogHeader
                    count={sensors.length}
                />


                {/* Карточки оборудования */}
                <CatalogGrid
                    sensors={sensors}
                    isAdmin={isAdmin}
                    onDetails={handleDetails}
                    onOrder={handleOrder}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

            </main>

            <Footer />


            {/* Модальное окно подробной информации */}
            {selectedSensor && (
                <div
                    className="catalog-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-label={selectedSensor.title}
                >
                    <button
                        className="catalog-modal__overlay"
                        onClick={handleCloseModal}
                        aria-label="Закрыть окно"
                    />

                    <div className="catalog-modal__content">
                        <button
                            className="catalog-modal__close"
                            onClick={handleCloseModal}
                            aria-label="Закрыть"
                        >
                            ×
                        </button>

                        <img
                            src={
                                selectedSensor.image ||
                                '/img/sensor.png'
                            }
                            alt={selectedSensor.title}
                            className="catalog-modal__image"
                        />

                        <div className="catalog-modal__body">
                            <div className="catalog-modal__heading">
                                <h2>
                                    {selectedSensor.title}
                                </h2>

                                <span />
                            </div>

                            <p className="catalog-modal__company">
                                {selectedSensor.company}
                            </p>

                            <div className="catalog-modal__cards">

                                <article className="catalog-modal__card">
                                    <h3>Преимущества</h3>

                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                selectedSensor.advantages ||
                                                'Информация пока не добавлена.',
                                        }}
                                    />
                                </article>


                                <article className="catalog-modal__card">
                                    <h3>Организация производства</h3>

                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                selectedSensor.productionManagement ||
                                                'Информация пока не добавлена.',
                                        }}
                                    />
                                </article>


                                <article className="catalog-modal__card">
                                    <h3>Программные возможности</h3>

                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                selectedSensor.capabilities ||
                                                'Информация пока не добавлена.',
                                        }}
                                    />
                                </article>

                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Форма добавления и редактирования оборудования */}
            {isEditorOpen && (
                <div className="catalog-editor">
                    <button
                        className="catalog-editor__overlay"
                        onClick={handleCloseEditor}
                        aria-label="Закрыть форму"
                    />

                    <div className="catalog-editor__content">
                        <button
                            className="catalog-editor__close"
                            onClick={handleCloseEditor}
                            aria-label="Закрыть"
                        >
                            ×
                        </button>

                        <div className="catalog-editor__header">
                            <span>
                                {editingSensor
                                    ? 'Редактирование'
                                    : 'Новая запись'}
                            </span>

                            <h2>
                                {editingSensor
                                    ? 'Изменение оборудования'
                                    : 'Добавление оборудования'}
                            </h2>
                        </div>


                        {(formError || equipmentError) && (
                            <div className="catalog-editor__error">
                                {formError || equipmentError}
                            </div>
                        )}


                        {Object.keys(validationErrors).length > 0 && (
                            <div className="catalog-editor__validation">
                                {Object.values(validationErrors).map(
                                    (error, index) => (
                                        <div key={index}>
                                            {error}
                                        </div>
                                    )
                                )}
                            </div>
                        )}


                        <form
                            className="catalog-editor__form"
                            onSubmit={handleSubmit}
                        >
                            <label>
                                <span>Название</span>

                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleFormChange}
                                    placeholder="Например, РСП-БРУ-01"
                                />
                            </label>


                            <label>
                                <span>Организация</span>

                                <input
                                    type="text"
                                    name="company"
                                    value={form.company}
                                    onChange={handleFormChange}
                                    placeholder="Название организации"
                                />
                            </label>


                            <label>
                                <span>Изображение</span>

                                <input
                                    type="text"
                                    name="image"
                                    value={form.image}
                                    onChange={handleFormChange}
                                    placeholder="/img/sensor.png"
                                />
                            </label>

                            <label>
    <span>Логотип</span>

    <input
        type="text"
        name="logo"
        value={form.logo}
        onChange={handleFormChange}
        placeholder="/img/company-logo.png"
    />
</label>


<label>
    <span>Краткое описание</span>

    <textarea
        name="summary"
        value={form.summary}
        onChange={handleFormChange}
        rows={3}
        placeholder="Краткое описание регистратора для карточки каталога"
    />
</label>


<label>
    <span>Преимущества</span>

    <textarea
        name="advantages"
        value={form.advantages}
        onChange={handleFormChange}
        rows={6}
        placeholder="Преимущества оборудования"
    />
</label>


<label>
    <span>Организация производства</span>

    <textarea
        name="productionManagement"
        value={form.productionManagement}
        onChange={handleFormChange}
        rows={6}
        placeholder="Возможности организации производства"
    />
</label>


<label>
    <span>Программные возможности</span>

    <textarea
        name="capabilities"
        value={form.capabilities}
        onChange={handleFormChange}
        rows={6}
        placeholder="Программные возможности регистратора"
    />
</label>

                            <div className="catalog-editor__actions">
                                <button
                                    type="button"
                                    className="catalog-editor__cancel"
                                    onClick={handleCloseEditor}
                                    disabled={isSaving}
                                >
                                    ОТМЕНА
                                </button>

                                <button
    type="submit"
    className="catalog-editor__save"
    disabled={isSaving}
>
    {isSaving
        ? 'СОХРАНЕНИЕ...'
        : editingSensor
            ? 'СОХРАНИТЬ'
            : 'ДОБАВИТЬ'}
</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    )
}

export default CatalogPage
