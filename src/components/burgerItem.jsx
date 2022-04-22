import PropTypes from "prop-types";

export const burgerItem = PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
})

