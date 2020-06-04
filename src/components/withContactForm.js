import React from 'react'
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as Yup from "yup";
import { Formik, Field, Form } from 'formik';
import Axios from 'axios';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics'

const schema = Yup.object().shape({
    name: Yup
        .string()
        .required("Este campo es requerido."),
    email: Yup
        .string()
        .email("Este campo debe ser un email.")
        .required("Este campo es requerido."),
    phone: Yup
        .string()
        .min(6, "Este campo es inválido")
        .required("Este campo es requerido.")
});

const INITIAL_VALUES = {
    name: "",
    email: "",
    phone: ""
};

const CloseButton = ({
    className,
    toggleOpen
}) => {
    return (
        <span
            style={{
                width: "31px",
                height: "31px",
                top: "1rem",
                right: "1.8rem",
                zIndex: "11"
            }}
            className={`${className} position-absolute font-weight-bold c-pointer opacity`}
            onClick={toggleOpen}>
            X
        </span>
    )
}
const withContactForm = WrappedComponent => (
    class extends React.Component {
        constructor(props) {
            super(props);
            this.toggleOpen = this.toggleOpen.bind(this);
            this.toggleIsLoading = this._toggleIsLoading.bind(this);
            this.handleSubmit = this._handleSubmit.bind(this);
            this.state = {
                open: false,
                isLoading: false
            };
        }

        toggleOpen() {
            this.setState({ open: !this.state.open });
        }

        _toggleIsLoading() {
            this.setState({ isLoading: !this.state.isLoading });
        }

        _handleSubmit(data, resetForm) {
            this.toggleIsLoading();
            console.log('this :>> ', this);

            var datas = {
                fields: [
                    {
                        name: "email",
                        value: data.email
                    },
                    {
                        name: "firstname",
                        value: data.name
                    },
                    {
                        name: "phone",
                        value: data.phone
                    }
                ],
                context: {
                    pageUri: "https://linktic.com/",
                    pageName: "Landing",
                },
                skipValidation: false
            };
            console.log('datas :>> ', datas);

            Axios.post('https://api.hsforms.com/submissions/v3/integration/submit/4136839/43bd47eb-88b5-4757-8773-24f66c11df18', datas)
                .then(response => {
                    console.log('response :>> ', response);
                    console.log('this response:>> ', this);
                    this.toggleIsLoading();
                    resetForm(INITIAL_VALUES);
                    this.toggleOpen();
                    trackCustomEvent({
                        // string - required - The object that was interacted with (e.g.video)
                        category: "PaginaWeb",
                        // string - required - Type of interaction (e.g. 'play')
                        action: "Click",
                        // string - optional - Useful for categorizing events (e.g. 'Spring Campaign')
                        label: "Linktic"
                    });
                })
                .catch(error => {
                    console.log('error :>> ', error);
                    console.log('this error:>> ', this);
                    this.toggleIsLoading();
                });
        }

        render() {
            return (
                <>
                    <WrappedComponent
                        toggleOpen={this.toggleOpen}
                        {...this.props} />
                    <Modal
                        isOpen={this.state.open}
                        toggle={this.toggleOpen}
                        size="lg"
                        centered
                    >
                        <ModalBody className="p-0">
                            <div className="row">
                                <div
                                    className="col-lg-6 position-relative">
                                    <img
                                        src="/img/li-bg-form.png"
                                        alt="bg form"
                                        style={{
                                            objectFit: "cover",
                                            zIndex: "1"
                                        }}
                                        className="d-none d-lg-block w-100 h-100"
                                    />
                                    <img
                                        src="/img/li-bg-form-mobile.png"
                                        alt="bg form"
                                        style={{
                                            objectFit: "cover",
                                            zIndex: "1"
                                        }}
                                        className="d-block d-lg-none w-100 h-100"
                                    />
                                    <div
                                        style={{
                                            zIndex: "2",
                                            top: "0"
                                        }}
                                        className="position-absolute d-flex flex-column justify-content-center align-items-center w-100 h-100 text-white pr-3">
                                        <h1 className="font-weight-bold mb-4">Contáctanos</h1>
                                        <p>
                                            Es momento de que crezcas con Linktic
                                        </p>
                                    </div>
                                    <CloseButton
                                        className="d-flex align-items-center justify-content-center d-lg-none bg-white color-1"
                                        toggleOpen={this.toggleOpen} />
                                </div>
                                <div className="col-lg-6 py-3 px-5 pl-lg-2 pr-lg-5 position-relative ">
                                    <CloseButton
                                        className="d-none d-lg-flex align-items-center justify-content-center bg-1 text-white"
                                        toggleOpen={this.toggleOpen} />
                                    <div className="d-flex flex-column h-100 justify-content-center">
                                        {/* Contact Form */}
                                        <div className="d-flex flex-column align-items-center">
                                            <h2 className="font-weight-bold d-none d-md-block">Ingresa tus datos</h2>
                                            <h3 className="font-weight-bold d-block d-md-none mt-3 mt-md-0">Ingresa tus datos</h3>
                                            <p className="my-3 text-center">
                                                Te contactaremos pronto<br />
                                                <span className="text-muted font-weight-bold">(más de lo que crees)</span>
                                            </p>
                                        </div>
                                        <Formik
                                            initialValues={INITIAL_VALUES}
                                            validationSchema={schema}
                                            onSubmit={() => null}
                                            isInitialValid={schema.isValidSync(INITIAL_VALUES)}
                                            >
                                            {({
                                                values,
                                                errors,
                                                touched,
                                                isValid,
                                                resetForm
                                            }) => (
                                                    <Form className="form-hubspot">
                                                        {/* NAME FIELD */}
                                                        <div className="form-group">
                                                            <label className="mb-0">
                                                                Nombres y Apellidos
                                                            </label>
                                                            <Field
                                                                className="form-control"
                                                                name="name"
                                                                placeholder="Ingrese sus nombres y apellidos."
                                                            />
                                                            {errors.name && touched.name && (
                                                                <div className="invalid-feedback d-block">
                                                                    {errors.name}
                                                                </div>
                                                            )}
                                                        </div>
                                                        {/* EMAIL FIELD */}
                                                        <div className="form-group mt-md-4">
                                                            <label className="mb-0">
                                                                Correo electrónico.
                                                            </label>
                                                            <Field
                                                                className="form-control"
                                                                name="email"
                                                                placeholder="Ingrese su correo electrónico."
                                                            />
                                                            {errors.email && touched.email && (
                                                                <div className="invalid-feedback d-block">
                                                                    {errors.email}
                                                                </div>
                                                            )}
                                                        </div>
                                                        {/* PHONE FIELD */}
                                                        <div className="form-group mb-5 mt-md-4">
                                                            <label className="mb-0">
                                                                Teléfono.
                                                            </label>
                                                            <Field
                                                                className="form-control"
                                                                name="phone"
                                                                placeholder="Ingrese su número de contacto."
                                                            />
                                                            {errors.phone && touched.phone && (
                                                                <div className="invalid-feedback d-block">
                                                                    {errors.phone}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <Button
                                                            onClick={() => this.handleSubmit(values, resetForm)}
                                                            disabled={!isValid || this.state.isLoading}
                                                            type="button"
                                                            className="d-none d-lg-block btn btn-sm bg-3 btn-fill-2 py-2 mt-3 px-5 text-white font-weight-bold rounded-0">
                                                            {
                                                                this.state.isLoading ? "Enviando ..." : "Enviar"
                                                            }
                                                        </Button>
                                                        <Button
                                                            onClick={() => this.handleSubmit(values, resetForm)}
                                                            disabled={!isValid || this.state.isLoading}
                                                            type="button"
                                                            className="mb-4 mb-lg-0 d-block d-lg-none btn btn-block btn-sm bg-3 btn-fill-2 py-2 mt-3 px-5 text-white font-weight-bold rounded-0">
                                                            {
                                                                this.state.isLoading ? "Enviando ..." : "Enviar"
                                                            }
                                                        </Button>
                                                    </Form>
                                                )}
                                        </Formik>
                                    </div>
                                </div>
                            </div>

                        </ModalBody>
                    </Modal>
                </>
            )
        }
    }
)

export default withContactForm;