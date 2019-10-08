import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
const global = require('../globals');

interface ManageMovieProps {

}

interface ManageMovieState {
    genres: any[];
    title: string;
    length: string;
    age_limit: string;
    genreInput: string;
    genreId: string;
    movies: any[];
}

class ManageMovie extends React.Component<ManageMovieProps, ManageMovieState> {

    componentDidMount() {
        this.getInfo();
    }

    getInfo = () => {
            fetch(`${global.HOST_URL}/getGenres`)
            .then(res => res.json())
            .then(res => this.setState({ genres: res }))
            .then(res => {
                fetch(`${global.HOST_URL}/movies`)
                .then(res => res.json())
                .then(res => this.setState({ movies: res }));
            });
    }

    constructor(props: ManageMovieProps) {
        super(props);
        this.state = {
            genres: [],
            title: '',
            length: '',
            age_limit: '',
            genreInput: '',
            genreId: '',
            movies: []
        }
    }

    private onChangeTitle = (e: any) => {
        this.setState({ title: e.target.value })
    }

    private onChangeLength = (e: any) => {
        this.setState({ length: e.target.value })
    }

    private onChangeAgeLimit = (e: any) => {
        this.setState({ age_limit: e.target.value })
    }

    private onChangeGenreId = (e: any) => {
        this.state.genres.filter(temp => {
            if (temp.name === e.target.value) {
                this.setState({ genreId: temp.id })
            }
            this.setState({ genreInput: e.target.value })
        })
    }

    private addMovie = (e: any) => {
        e.preventDefault();
        let data = {
            title: this.state.title,
            length: this.state.length,
            age_limit: this.state.age_limit,
            genreId: this.state.genreId,
            genre: {
                name: this.state.genreInput
            }
        }

        console.log(data);

        fetch(`${global.HOST_URL}/addMovie`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
            .then(res => res.json())
            .then(res => {
                let tempArray = this.state.movies;
                tempArray.push(data);
                this.setState({ movies : tempArray })
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Titel på filmen</Form.Label>
                            <Form.Control type="text" placeholder="Filmtitel" value={this.state.title} onChange={this.onChangeTitle} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Længde</Form.Label>
                            <Form.Control type="text" placeholder="Længde" value={this.state.length} onChange={this.onChangeLength} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Aldersbegrænsning</Form.Label>
                        <Form.Control placeholder="Indsæt alder" value={this.state.age_limit} onChange={this.onChangeAgeLimit} />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control as="select" value={this.state.genreInput} onChange={this.onChangeGenreId}>
                                {this.state.genres.map((g) => {
                                    return <option key={g.id}>{g.name}</option>
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Button variant="success" type="submit" onClick={this.addMovie}>
                        Tilføj Film
  </Button>
                </Form>
                <br />
                <Table striped bordered hover variant="dark">

                    <thead>
                        <tr>
                            <th>Titel</th>
                            <th>Varighed</th>
                            <th>Alder</th>
                            <th>Genre</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map(m => {
                            return (
                                <tr key={m.id}>
                                    <td>{m.title}</td>
                                    <td>{m.length}</td>
                                    <td>{m.age_limit}</td>
                                    <td>{m.genre.name}</td>
                                    <td><Button variant="danger" type="submit" onClick={(e: any) => {
                                        e.preventDefault();

                                        fetch(`${global.HOST_URL}/deleteMovie/${m.id}`, {
                                            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                                            headers: {
                                                'Content-Type': 'application/json'
                                                // 'Content-Type': 'application/x-www-form-urlencoded',
                                            }
                                        })
                                            .then(res => res.json())
                                            .then(res => {
                                                let tempArray = this.state.movies.filter(movie => movie.id !== m.id);
                                                this.setState({ movies: tempArray })
                                            })
                                            .catch(err => console.log(err));
                                    }}>
                                        Slet
                                        </Button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>

        )
    }

}

export default ManageMovie;