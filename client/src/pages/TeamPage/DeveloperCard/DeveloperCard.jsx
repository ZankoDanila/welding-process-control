import './DeveloperCard.css'

function DeveloperCard({
    person,
    variant,
}) {
    const isLeader = variant === 'leader'

    const description = person.description
        ?.split('\n')
        .filter(Boolean)

    return (
        <article
            className={`developer-card ${
                isLeader
                    ? 'developer-card--leader'
                    : 'developer-card--member'
            }`}
        >

            <div
                className={`developer-tag ${person.tagColor}`}
            >
                {person.tag}
            </div>

            <img
                src={person.avatar}
                alt={`${person.lastName} ${person.firstName}`}
                className="developer-avatar"
            />

            <div className="developer-name">

                <div className="developer-last-name">
                    {person.lastName}
                </div>

                <div className="developer-first-name">
                    {person.firstName}
                </div>

            </div>

            <div className="developer-description">

                {description?.map((line, index) => (
                    <span key={index}>
                        {line}
                        {index < description.length - 1 && (
                            <br />
                        )}
                    </span>
                ))}

            </div>

            <div className="developer-expertise">
                {person.expertise}
            </div>

            <a
                href={person.btnHref || '#'}
                className="developer-button"
            >
                {person.btnText}
            </a>

        </article>
    )
}

export default DeveloperCard
