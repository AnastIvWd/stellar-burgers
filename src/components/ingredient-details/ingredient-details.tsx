import { FC, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector, useDispatch } from '../../services/store';
import { Modal } from '../modal';
import { fetchIngredients } from '../../services/burgerConstructorSlice/thunk';
import styles from '../ui/modal/modal.module.css';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const ingredientData = useSelector((store) =>
    store.ingredients.ingredients.find((item) => item._id === id)
  );

  useEffect(() => {
    if (!ingredientData) {
      dispatch(fetchIngredients());
    }
  }, []);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
