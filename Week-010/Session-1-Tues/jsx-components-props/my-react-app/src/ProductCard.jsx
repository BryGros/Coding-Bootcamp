export default function ProductCard({title, price, image, isOnSale}) {
    // if you don't destructure the props, you have to access the values like so:
    // props.title, props.image, props.image, props.isOnSale
    return (
        <div className="product-card">
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p className='price'>
                {/* Below checks if an item is on sale, and if so, it adds the span element */}
                {isOnSale && <span className='sale'>SALE! </span>}${price}
            </p>
            <div>This is great</div>
        </div>
    );
}