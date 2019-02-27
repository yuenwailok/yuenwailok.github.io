//npx babel --watch src --out-dir . --presets react-app/prod 
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GoogleBook = function (_React$Component) {
    _inherits(GoogleBook, _React$Component);

    function GoogleBook(props) {
        _classCallCheck(this, GoogleBook);

        var _this = _possibleConstructorReturn(this, (GoogleBook.__proto__ || Object.getPrototypeOf(GoogleBook)).call(this, props));

        _this.list = [];
        _this.wronginput = "";
        _this.state = {
            list: [],
            items: {},
            input: "",
            error: false,
            loading: false
        };
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.basicForm = _this.basicForm.bind(_this);
        _this.authorsList = _this.authorsList.bind(_this);
        _this.dataList = _this.dataList.bind(_this);
        return _this;
    }

    _createClass(GoogleBook, [{
        key: "handleChange",
        value: function handleChange(event) {
            this.setState({ input: event.target.value });
        }
    }, {
        key: "authorsList",
        value: function authorsList(authors) {
            if (authors === undefined) {
                return "";
            } else {
                return "By: " + authors.join(", ");
            }
        }
    }, {
        key: "dataList",
        value: function dataList() {
            var arr = this.list.map(function (item) {
                return React.createElement("option", { value: item });
            });
            return React.createElement(
                "datalist",
                { id: "list" },
                arr
            );
        }
    }, {
        key: "basicForm",
        value: function basicForm(arr) {
            var spin = "";

            if (this.state.loading) {
                spin = React.createElement(
                    "div",
                    { className: "spinner-border", role: "status" },
                    React.createElement(
                        "span",
                        { className: "sr-only" },
                        "Loading..."
                    )
                );
            } else {
                spin = "";
            }
            return React.createElement(
                "div",
                { className: "main" },
                React.createElement(
                    "h1",
                    null,
                    "Book Finder:"
                ),
                React.createElement(
                    "form",
                    { onSubmit: this.handleSubmit },
                    React.createElement("input", { className: " bordernone w-50", type: "search", list: "list", value: this.state.input, onChange: this.handleChange, placeholder: "Search by book title or author", required: true }),
                    this.dataList(),
                    React.createElement("input", { type: "submit", value: "Search", className: "button bordernone" })
                ),
                spin,
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement(
                    "div",
                    { className: "container w-80" },
                    React.createElement(
                        "div",
                        { className: "row row-eq-height" },
                        arr
                    )
                )
            );
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "handleSubmit",
        value: function handleSubmit(event) {
            var _this2 = this;

            var fet = fetch('https://www.googleapis.com/books/v1/volumes?q=' + this.state.input + "&maxResults=40").then(function (response) {
                if (response.ok) {
                    _this2.setState({ error: false });
                    return response.json();
                } else {
                    throw Error("Error when fetching");
                }
            }).then(function (myJson) {
                var lists = [].concat(_toConsumableArray(_this2.state.list));
                lists.push(_this2.state.input);
                _this2.list.push(_this2.state.input);
                _this2.setState({ items: myJson, list: lists });
                if (myJson.totalItems == 0) {
                    _this2.wronginput = _this2.state.input;
                }
                _this2.setState({ loading: false });
            }).catch(function () {
                _this2.setState({ error: true, loading: false });
            });

            //R3V6AGWE1
            this.setState({ loading: true });

            event.preventDefault();
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            if (this.state.error) {
                return React.createElement(
                    "div",
                    { className: "main" },
                    this.basicForm([]),
                    React.createElement(
                        "p",
                        null,
                        "Your query is invalid"
                    )
                );
            }

            if (this.state.items.totalItems == 0) {
                return React.createElement(
                    "div",
                    { className: "main" },
                    this.basicForm([]),
                    React.createElement(
                        "p",
                        null,
                        "No books found from your input ",
                        this.wronginput
                    )
                );
            }

            var arr = [];

            if (this.state.items.totalItems != 0 && this.state.items.totalItems !== undefined) {
                arr = this.state.items.items.map(function (item) {
                    var link = "";
                    if (item.volumeInfo.imageLinks !== undefined) {
                        link = item.volumeInfo.imageLinks.thumbnail;
                    } else {
                        link = "https://books.google.com.au/googlebooks/images/no_cover_thumb.gif";
                    }
                    return React.createElement(
                        "div",
                        { className: "col-xs-12 col-md-6 border" },
                        React.createElement(
                            "div",
                            { className: "row inher" },
                            React.createElement(
                                "div",
                                { className: "col-*-auto" },
                                React.createElement("img", { className: "img-thumbnail", src: link, width: "128", height: "201" })
                            ),
                            React.createElement(
                                "div",
                                { className: "col" },
                                React.createElement(
                                    "p",
                                    null,
                                    item.volumeInfo.title
                                ),
                                React.createElement(
                                    "p",
                                    { className: "author" },
                                    _this3.authorsList(item.volumeInfo.authors)
                                ),
                                React.createElement(
                                    "p",
                                    { className: "author" },
                                    item.volumeInfo.publisher
                                ),
                                React.createElement(
                                    "p",
                                    null,
                                    React.createElement(
                                        "a",
                                        { className: "button2", href: item.volumeInfo.infoLink },
                                        "Click here"
                                    )
                                )
                            )
                        )
                    );
                });
            }

            return React.createElement(
                "div",
                { className: "main" },
                this.basicForm(arr)
            );
        }
    }]);

    return GoogleBook;
}(React.Component);

ReactDOM.render(React.createElement(GoogleBook, null), document.getElementById('content'));