import About from "../components/About"
import Emblem from "../components/Emblem"
import FAQ from "../components/FAQ"
import Testimonials from "../components/Testimonials"

const AboutPage = () => {
    return(
       
        <section className="py-15">
        <About/>
        {/* <Testimonials/> */}
        <FAQ/>
        <Emblem/>
        </section>
      
    )
}
export default AboutPage
