import React from 'react';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            message: "",
            successMessage: "",
            errorMessage: "",
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, message } = this.state;

        try {
            const response = await fetch('http://localhost/ECF0624/ExampleECF0624/ejemplo/src/DB/Interactiondb.php/?addContactMessage=1', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, message }),
            });

            const data = await response.json();

            if (data.success) {
                this.setState({ successMessage: data.message, errorMessage: "", email: "", message: "" });
            } else {
                this.setState({ errorMessage: data.message, successMessage: "" });
            }
        } catch (error) {
            this.setState({ errorMessage: "Error al enviar el mensaje. Inténtalo de nuevo.", successMessage: "" });
        }
    };

    render() {
        const { email, message, successMessage, errorMessage } = this.state;

        return (
            <div className='formconteiner'>
                <div className="formtxt1">
                    <h1>EcoRide : contact</h1>
                    <h3>Pour toute demande de renseignements ou suggestions sur notre site, n'hésitez pas à nous contacter, nous vous répondrons dans les plus brefs délais.</h3>
                </div>
                <form className='formcontact' onSubmit={this.handleSubmit}>
                    <div className="formtxt2">
                        <h3>Nous sommes là pour vous écouter</h3>
                    </div>
                    <div className="mb-3">
                        <strong><label htmlFor="exampleInputEmail1" className="form-label">Email</label></strong>
                        <input
                            type="email"
                            className="form-control"
                            id="forminput1"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <strong><label htmlFor="exampleInputPassword1" className="form-label">Message</label></strong>
                        <textarea
                            className="form-control"
                            id="formtextarea"
                            name="message"
                            rows="3"
                            value={message}
                            onChange={this.handleChange}
                            required
                        ></textarea>
                    </div>
                    {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                    <button type="submit" className="btn btn-success">Envoyer</button>
                </form>
                <div className='formback'>
                    <div className="formtxt3">
                        <h3>Vous pouvez également nous rendre visite dans nos bureaux à Toulouse.</h3>
                    </div>
                    <div className='formmap'>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5901.170608114208!2d1.4419262350960527!3d43.599954164415294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aebbb2f4bd4dd7%3A0x8648c41bbf5d98da!2sCafe%20Bong!5e0!3m2!1ses!2sfr!4v1701254077501!5m2!1ses!2sfr"
                            width="650"
                            height="650"
                            allowFullScreen=""
                            loading="lazy"
                            className="mapa"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;