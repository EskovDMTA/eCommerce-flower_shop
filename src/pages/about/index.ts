/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import "./index.css";
import Page from '../../templates/page';
import СreateElement from '../../templates/constructor';
import aboutRSImgPath from '../../assets/images/rs_school.svg';


const TeamMembers = [
  {
    name: 'Iryna',
    photo: 'https://avatars.githubusercontent.com/u/106581855?v=4',
    role: 'Team Lead',
    GitHub: 'https://github.com/IrinaZhibul',
    contributions: 'Integration login and registration forms with CommerceTools API. Profile page with functionality for changing passwords and managing addresses. Basket Page, except promo codes logic.',
    biography: 'Hello there! I am Ira, and I am thrilled to introduce myself as a member of this fantastic team. Currently, I am in the second stage of the Frontend course at RS School, where I am honing my skills to become a top-notch front-end developer. As the project team lead, I take pride in guiding our talented group toward our common goals. I am passionate about creating web experiences that not only function flawlessly but also captivate users with their aesthetics and usability. Learning is a continuous journey for me, and I approach each project and challenge with enthusiasm and dedication. I am always eager to expand my knowledge and grow as a developer.',
  },
  {
    name: 'Dima',
    photo: 'https://avatars.githubusercontent.com/u/103447969?v=4',
    role: 'Developer',
    GitHub: 'https://github.com/EskovDMTA',
    contributions: 'Webpack, ESLint, Login and Registration validation, Product page.',
    biography: 'Hello! My name is Dima, and I work in a construction company as a leading engineer. My desire to adapt routine work processes led me to learn Python. In the process of studying, I expanded my horizons and began to study new technologies in the IT field. Web development aroused my particular interest, and I chose it as my main focus. My goal is to become a Fullstack developer. While studying frontend, I decided to take training at RS School, and these courses turned out to be very informative for me. I am excited to work in a group with such a diverse group of guys and am constantly striving to learn and master new skills.',
  },
  {
    name: 'Maxim',
    photo: 'https://avatars.githubusercontent.com/u/98457968?v=4',
    role: 'Developer',
    GitHub: 'https://github.com/kontinentkm',
    contributions: 'Routing, Header, Main page, Catalog, search, sorting, filters, About us.',
    biography: 'Hello! I am Maxim, a frontend developer. I have recently completed the first stage of the RSSchool frontend course and I am currently progressing through stage two. I am constantly seeking new challenges and opportunities to grow as a developer. Joining RS School was a natural choice for me, as it provides the ideal environment for learning and collaboration. I am excited to be part of this community and eager to learn from the talented mentors and fellow students.',
  },

];



class AboutPage extends Page {
  constructor(id: string) {
    super(id);
  }

  renderPage() {
    const aboutSection = new СreateElement('section', ['about-section']).appendTo(this.container);
    const aboutTitleBlock = new СreateElement('div', ['about-title-block'], []).appendTo(aboutSection);
    const aboutTitle = new СreateElement('h1', ['about-title'], [], 'OUR TEAM').appendTo(aboutTitleBlock);
    const aboutRSBlock = new СreateElement('a', ['about-rs-block'], [{prop: 'href', value: 'https://rs.school/index.html'}]).appendTo(aboutTitleBlock);
    const aboutRSImg = new СreateElement('img', ['about-rs-img'], [{prop: 'src', value: aboutRSImgPath}]).appendTo(aboutRSBlock);
    const aboutCollaborationBlock = new СreateElement('div', ['about-collaboration-block'], []).appendTo(aboutSection);
    const aboutCollaborationKey = new СreateElement('div', ['about-collaboration-key'], [], 'Collaboration:').appendTo(aboutCollaborationBlock);
    const aboutCollaborationText = new СreateElement('p', ['about-collaboration-text'], [], '', 'Throughout the entire project, our team communicated daily via chat, and also had regular calls several times a week. To coordinate tasks, we utilized GitHub Projects. Within it, we created a board for each sprint and tickets for each individual task. The workload was evenly distributed, with each developer handling multiple tasks during each sprint.').appendTo(aboutCollaborationBlock);





    const aboutItems = new СreateElement('div', ['about-items']).appendTo(aboutSection);
    
    TeamMembers.forEach(member => {
      const memberItem = new СreateElement('div', ['member-item']).appendTo(aboutItems);
      const memberName = new СreateElement('div', ['member-name'], [], `${member.name}`).appendTo(memberItem);
      const memberPhoto = new СreateElement('img', ['member-photo'], [{prop: 'src', value: member.photo}]).appendTo(memberItem);

      const memberRoleBlock = new СreateElement('div', ['member-role-block', 'member-block']).appendTo(memberItem);
      const memberRoleKey = new СreateElement('div', ['member-role-key', 'member-key'], [], 'Team role:').appendTo(memberRoleBlock);
      const memberRole = new СreateElement('div', ['member-role'], [], `${member.role}`).appendTo(memberRoleBlock);

      const memberGitHubBlock = new СreateElement('div', ['member-git-block', 'member-block']).appendTo(memberItem);
      const memberGitHubKey = new СreateElement('div', ['member-git-key', 'member-key'], [], 'GitHub:').appendTo(memberGitHubBlock);
      const memberGitHub = new СreateElement('a', ['member-git'], [{prop: 'href', value: member.GitHub}, {prop: 'target', value: 'blank'}], 'Link').appendTo(memberGitHubBlock);

      const memberContributionsBlock = new СreateElement('div', ['member-contributions-block', 'member-block']).appendTo(memberItem);
      const memberContributionsKey = new СreateElement('div', ['member-contributions-key', 'member-key'], [], 'Contributions:').appendTo(memberContributionsBlock);
      const memberContributions = new СreateElement('div', ['member-contibutions'], [], `${member.contributions}`).appendTo(memberContributionsBlock);

      const memberBioBlock = new СreateElement('div', ['member-bio-block', 'member-block']).appendTo(memberItem);
      const memberBioKey = new СreateElement('div', ['member-bio-key', 'member-key'], [], 'Bio:').appendTo(memberBioBlock);
      const memberBio = new СreateElement('p', ['member-bio'], [], `${member.biography}`).appendTo(memberBioBlock);
    });


  }

  render() {
    this.renderPage();
    return this.container;
  }
}

export default AboutPage;