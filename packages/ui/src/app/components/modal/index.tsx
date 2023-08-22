import React from 'react';
import { withTranslation } from 'react-i18next';
import ReactModal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'none',
    border: 'none',
  },
  overlay: { zIndex: 1000 },
};

ReactModal.setAppElement('#root');

class Modal extends React.Component<{
  title: string;
  id: string;
  element?: JSX.Element;
  t?: (key) => string;
}> {
  state = {
    opened: false,
  };

  constructor(props) {
    super(props);
  }

  open = () => {
    this.setState({ ...this.state, opened: true });
  };

  close = () => {
    this.setState({ ...this.state, opened: false });
  };

  render() {
    const { id, title, t, element } = this.props;

    return (
      <ReactModal
        className="relative w-full max-w-2xl max-h-full h-full md:h-4/6"
        isOpen={this.state.opened}
        onRequestClose={this.close}
        style={customStyles}
      >
        <div className="rounded-lg shadow-xl dark:bg-navy-800 bg-white h-full flex flex-col justify-between">
          <div className="h-full flex flex-col overflow-auto">
            <div className="flex items-start justify-between p-4">
              <h3 className="text-xl font-semibold text-navy-700 dark:text-white px-3">
                {title}
              </h3>
              <button
                onClick={this.close}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="p-6 flex flex-col flex-1 overflow-y-scroll">
              {this.props.element}
            </div>
          </div>
          <div className="flex items-center p-6 space-x-2 justify-end">
            <button
              onClick={this.close}
              type="button"
              className="w-1/2 md:w-1/4 linear rounded-xl bg-gray-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-gray-600 active:bg-gray-700 dark:bg-gray-400 dark:text-white dark:hover:bg-gray-300 dark:active:bg-gray-200"
            >
              {t!('components.modal.cancel')}
            </button>
            <button
              form={id}
              type="submit"
              className="w-1/2 md:w-1/4 linear rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            >
              {t!('components.modal.save')}
            </button>
          </div>
        </div>
      </ReactModal>
    );
  }
}

export default withTranslation(undefined, { withRef: true })(Modal);
