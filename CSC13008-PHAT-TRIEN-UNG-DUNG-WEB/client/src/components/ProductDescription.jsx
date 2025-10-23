import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { http } from "../lib/http";
import StarRating from "./StarRating";
import ImageGallery from "./ImageGallery";

export default function ProductDescription() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let canceled = false;

        setLoading(true);
        setError(null);

        async function loadProduct() {
            try {
                const res = await http.get(`/products/${id}`);

                if (!canceled) {
                    setProduct(res.data.data);
                    setLoading(false);
                    setError(null);
                }
            } catch (err) {
                if (!canceled) {
                    setLoading(false);
                    setError(err?.response?.data?.message || err?.message || "Cannot load product details");
                };
            }
        }

        loadProduct();
        return () => {
            canceled = true;
        };
    }, [id]);


    return (
        <>
            {loading && <div>Dang tai...</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && !error && product && (
                <div>
                    {/*================Single Product Area =================*/}
                    <div className="product_image_area">
                        <div className="container">
                            <div className="row s_product_inner">
                                <div className="col-lg-6">
                                    <div className="s_Product_carousel">
                                        <ImageGallery images={product.Images} />
                                    </div>
                                </div>
                                <div className="col-lg-5 offset-lg-1">
                                    <div className="s_product_text">
                                        <h3>{product.name}</h3>
                                        <h2>${product.price}</h2>
                                        <ul className="list">
                                            <li><a className="active" href="#"><span>Category</span> : {product.Category.name}</a></li>
                                            <li><a href="#"><span>Availibility</span> : In Stock</a></li>
                                        </ul>
                                        <p>{product.summary}</p>
                                        <div className="product_count">
                                            <label htmlFor="qty">Quantity:</label>
                                            <input type="text" name="qty" id="sst" maxLength={12} defaultValue={1} title="Quantity:" className="input-text qty" />
                                            <button onClick={() => {
                                                const result = document.getElementById('sst');
                                                const sst = result.value;
                                                if (!isNaN(sst)) result.value++;
                                            }} className="increase items-count" type="button"><i className="lnr lnr-chevron-up" /></button>
                                            <button onClick={() => {
                                                const result = document.getElementById('sst');
                                                const sst = result.value;
                                                if (!isNaN(sst) && sst > 0) result.value--;
                                            }} className="reduced items-count" type="button"><i className="lnr lnr-chevron-down" /></button>
                                        </div>
                                        <div className="card_area d-flex align-items-center">
                                            <a className="primary-btn" href="#">Add to Cart</a>
                                            <a className="icon_btn" href="#"><i className="lnr lnr lnr-diamond" /></a>
                                            <a className="icon_btn" href="#"><i className="lnr lnr lnr-heart" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*================End Single Product Area =================*/}
                    {/*================Product Description Area =================*/}
                    <section className="product_description_area">
                        <div className="container">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Description</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link
                                    {product" id="review-tab" data-toggle="tab" href="#review" role="tab" aria-controls="review" aria-selected="false">Reviews</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    {product.description}
                                </div>
                                <div className="tab-pane fade" id="review" role="tabpanel" aria-labelledby="review-tab">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="row total_rate">
                                                <div className="col-6">
                                                    <div className="box_total">
                                                        <h5>Overall</h5>
                                                        <h4>{product.stars}</h4>
                                                        <h6>({product.reviewCount} Reviews)</h6>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="rating_list">
                                                        <h3>Based on {product.reviewCount} Reviews</h3>
                                                        <ul className="list">
                                                            <li><a href="#">5 Star <StarRating rating={5} />{" "}{product.Reviews.filter(r => r.rating === 5).length}</a></li>
                                                            <li><a href="#">4 Star <StarRating rating={4} />{" "}{product.Reviews.filter(r => r.rating === 4).length}</a></li>
                                                            <li><a href="#">3 Star <StarRating rating={3} />{" "}{product.Reviews.filter(r => r.rating === 3).length}</a></li>
                                                            <li><a href="#">2 Star <StarRating rating={2} />{" "}{product.Reviews.filter(r => r.rating === 2).length}</a></li>
                                                            <li><a href="#">1 Star <StarRating rating={1} />{" "}{product.Reviews.filter(r => r.rating === 1).length}</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="review_list">
                                                {product.Reviews.map((r) => (
                                                    <div className="review_item" key={r.id}>
                                                        <div className="media">
                                                            <div className="d-flex">
                                                                <img src={r.User.profileImage} className="rounded rounded-circle" style={{ width: "70px", height: "70px" }} />
                                                            </div>
                                                            <div className="media-body">
                                                                <h4>{r.User.firstName} {r.User.lastName}</h4>
                                                                <StarRating rating={r.rating} />
                                                            </div>
                                                        </div>
                                                        <p>{r.comment}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="review_box">
                                                <h4>Add a Review</h4>
                                                <p>Your Rating:</p>
                                                <ul className="list">
                                                    <li><a href="#"><i className="fa fa-star" /></a></li>
                                                    <li><a href="#"><i className="fa fa-star" /></a></li>
                                                    <li><a href="#"><i className="fa fa-star" /></a></li>
                                                    <li><a href="#"><i className="fa fa-star" /></a></li>
                                                    <li><a href="#"><i className="fa fa-star" /></a></li>
                                                </ul>
                                                <p>Outstanding</p>
                                                <form className="row contact_form" action="contact_process.php" method="post" id="contactForm" noValidate="novalidate">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" id="name" name="name" placeholder="Your Full name" onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Your Full name'} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input type="email" className="form-control" id="email" name="email" placeholder="Email Address" onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Email Address'} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" id="number" name="number" placeholder="Phone Number" onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Phone Number'} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <textarea className="form-control" name="message" id="message" rows={1} placeholder="Review" onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Review'} defaultValue={""} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 text-right">
                                                        <button type="submit" value="submit" className="primary-btn">Submit Now</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*================End Product Description Area =================*/}
                </div>
            )}
        </>
    );
}
