export default function FooterColumnLinks({data}) {

    const {links} = data;

    const linkList = links.map(link => <li key={link}><a href="">{link}</a></li>);
    
    return (
        <div>
            <h3>{data.title}</h3>
            <ul>{linkList}</ul>
        </div>
    );
}