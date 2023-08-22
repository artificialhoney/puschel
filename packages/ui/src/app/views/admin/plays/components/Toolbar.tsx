import { useQueryClient } from '@tanstack/react-query';
import { createRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MdOutlineEditNote,
  MdOutlineStopCircle,
  MdPlayCircleOutline,
  MdStarBorder,
} from 'react-icons/md';
import { Link } from 'react-router-dom';

import Modal from '../../../../components/modal';
import {
  Play,
  useStartPlayMutation,
  useStopPlayMutation,
} from '../../../../gql';
import { dataSource, userId } from '../../../../static';
import RatingForm from './RatingForm';

const Toolbar = (props: { active?: boolean; play: Play }) => {
  const { active, play } = props;

  const queryClient = useQueryClient();

  const startMutation = useStartPlayMutation(dataSource());
  const stopMutation = useStopPlayMutation(dataSource());

  const { t } = useTranslation();

  const start = () => {
    startMutation.mutate(
      { id: play.id! },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries();
        },
      }
    );
  };

  const stop = () => {
    stopMutation.mutate(
      { id: play.id! },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries();
        },
      }
    );
  };

  const closeRatingModal = async () => {
    modalRef.current.close();
    await queryClient.invalidateQueries();
  };

  const openRatingModal = () => {
    modalRef.current.open();
  };

  const canRate = () => {
    return (
      !!userId() &&
      play.runs!.length > 0 &&
      play.runs![play.runs!.length - 1].ratings?.every(
        (r) => r.userId! !== userId()
      )
    );
  };

  const modalRef = createRef<any>();

  return (
    <>
      <button onClick={active ? stop : start}>
        {active ? <MdOutlineStopCircle /> : <MdPlayCircleOutline />}
      </button>
      <Link className="ml-1 self-center" to={`/plays/${play.name}/edit`}>
        <MdOutlineEditNote />
      </Link>
      {canRate() && (
        <>
          <button onClick={openRatingModal}>
            <MdStarBorder />
          </button>
          <Modal
            id="rating"
            ref={modalRef}
            title={t('components.ratingForm.title', { title: play.name })}
            element={
              <RatingForm
                run={play.runs![play.runs!.length - 1]}
                id="rating"
                onSaveSuccess={closeRatingModal}
              />
            }
          />
        </>
      )}
    </>
  );
};

export default Toolbar;
