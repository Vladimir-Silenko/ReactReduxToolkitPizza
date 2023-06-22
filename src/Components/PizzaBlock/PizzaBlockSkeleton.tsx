import React from 'react'
import ContentLoader from 'react-content-loader'

const PizzaBlockSkeleton: React.FC = () => {
    return (
        <div>
            <ContentLoader
                className="pizza-block"
                speed={3}
                width={285}
                height={470}
                viewBox="0 0 285 470"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb">
                <circle cx="137" cy="137" r="125" />
                <rect x="2" y="287" rx="10" ry="10" width="280" height="24" />
                <rect x="2" y="333" rx="10" ry="10" width="280" height="88" />
                <rect x="4" y="435" rx="10" ry="10" width="87" height="28" />
                <rect x="151" y="425" rx="20" ry="20" width="127" height="45" />
            </ContentLoader>
        </div>
    )
}

export default PizzaBlockSkeleton
