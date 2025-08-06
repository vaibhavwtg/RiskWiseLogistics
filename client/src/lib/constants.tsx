import riskwiseLogo from "@assets/Riskwise Tech (1)_1754471853859.png";

export const SITE_CONFIG = {
  name: "RiskWise Tech",
  description: "Leading enterprise risk management software specifically designed for logistics, freight forwarding, and customs broking operations.",
  logo: riskwiseLogo,
  contact: {
    phone: "+61 410 663 456",
    email: "contact@riskwisetech.com",
    address: "Unit 2, 7 Packard Ave, Castle Hill NSW 2154"
  },
  formspree: {
    endpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/YOUR_FORM_ID"
  }
};

export const NAVIGATION_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Logistics Risk", href: "/logistics-risk" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
];

export const FEATURE_MODULES = [
  {
    title: "Audit Management",
    shortDescription: "End-to-end functionality for managing the complete audit lifecycle with industry best practices.",
    description: "Provides end-to-end functionality for managing the complete audit life-cycle – starting with audit planning and scheduling, development of audit plans and checklists, to audit finalisation with audit findings and agreed actions. Built on industry best practices for efficient audit management.",
    image: "https://tickitondemand.com.au/wp-content/uploads/2015/01/audit-management.jpg",
    features: [
      {
        title: "Audit Planning & Scheduling",
        description: "Create audit programs configured exactly to your organisation's needs. Components can be allocated to auditors with tracked completion. Schedule and repeat audits for consistency across cycles.",
        image: "https://tickitondemand.com.au/wp-content/uploads/2015/01/audit-management.jpg"
      },
      {
        title: "Audit Question Bank",
        description: "Create and save questions and checklists in the Audit Question Bank. Pre-configured questions can be used across multiple audits without re-entry, with centralized change management.",
        image: "https://tickitondemand.com.au/wp-content/uploads/2015/04/Audit-Question-Bank.jpg"
      },
      {
        title: "Findings & Report Generation",
        description: "Repository for audit observations and findings with configurable detail levels. Generate comprehensive audit reports easily using the integrated reporting system.",
        image: "https://tickitondemand.com.au/wp-content/uploads/2015/01/audit-report.png"
      },
      {
        title: "Agreed Actions Management",
        description: "Create agreed actions directly from audits, added as trackable tasks allocated across the business. Staff accountability with automated reminders and result monitoring.",
        image: "https://tickitondemand.com.au/wp-content/uploads/2015/01/audit-agreedactions.png"
      }
    ]
  },
  {
    title: "Compliance Management",
    shortDescription: "Monitor compliance plans and generate reports on compliant, non-compliant, or overdue tasks.",
    description: "Help monitor your compliance plan and generate reports on compliant, non-compliant or overdue tasks. Complete historical archive enabling reporting and analysis of compliance and risk information over time.",
    image: "https://tickitsystems.com.au/wp-content/uploads/2023/07/image-8.png",
    features: [
      {
        title: "Compliance Obligations",
        description: "Manage compliance with legislation, internal policies, accreditation, and agreed actions. Easily track, manage, and report on all compliance obligations.",
        image: "https://tickitsystems.com.au/wp-content/uploads/2023/07/image-8.png"
      },
      {
        title: "Reference Documents & Evidence",
        description: "Link obligations to reference documents on intranet, internet, or uploaded to system. Require staff to enter notes or attach evidence for task completion.",
        image: "https://tickitsystems.com.au/wp-content/uploads/2023/07/image-9.png"
      },
      {
        title: "Task Reassignment",
        description: "Simple reassignment of tasks between staff members, handling changes in responsibilities, long-term leave, or new user setup with ease.",
        image: "https://tickitsystems.com.au/wp-content/uploads/2023/07/image-10.png"
      },
      {
        title: "Compliance Reporting",
        description: "Template reports with flexibility to modify, save and distribute. Generate task status reports and overdue task analysis for comprehensive compliance oversight.",
        image: "https://tickitsystems.com.au/wp-content/uploads/2023/07/image-11.png"
      }
    ]
  },
  {
    title: "Incident Management",
    shortDescription: "Comprehensive incident reporting and management with configurable forms and workflow automation.",
    description: "Cuts through complexity to provide the ideal mix of features and flexibility. Create any kind of reporting form with attached workflows, ensuring incidents are actioned by the right staff as soon as they are entered.",
    image: "https://tickitondemand.com.au/wp-content/uploads/2015/01/ic-webkiosk.jpg",
    features: [
      {
        title: "Web Kiosk Reporting",
        description: "Innovative web kiosk functionality requires no user login to report incidents. Simple plain English forms that staff want to use, deployable on corporate intranet or desktop.",
        image: "https://tickitondemand.com.au/wp-content/uploads/2015/01/ic-webkiosk.jpg"
      },
      {
        title: "Configurable Forms",
        description: "Configure your own incident reporting forms. Choose fields, order, and mandatory/optional settings. Set up management-only fields not visible in reporting screens.",
        image: "https://tickitondemand.com.au/wp-content/uploads/2015/01/ic-configurableforms.jpg"
      },
      {
        title: "Conditional Logic",
        description: "Dynamic form changes based on responses. Questions can be displayed or hidden based on previous answers, simplifying the user experience.",
        image: "https://tickitondemand.com.au/wp-content/uploads/2015/01/ic-configurableforms.jpg"
      },
      {
        title: "Access Control & Triage",
        description: "Set access permissions globally, by location, or business unit. Triage functionality allows authorized users to confirm or reject reported incidents.",
        image: "https://tickitondemand.com.au/wp-content/uploads/2015/01/ic-Accesspermissions.jpg"
      },
      {
        title: "Risk & Task Integration",
        description: "Link incidents to risks for complete organizational picture over time. Connect incidents to tasks ensuring actions are recorded, tracked, and signed-off.",
        image: "https://tickitondemand.com.au/wp-content/uploads/2015/01/ic-linkincidentrisk.jpg"
      }
    ]
  },
  {
    title: "Policy Management",
    shortDescription: "Develop and manage organizational policies with version control and integrated scalable framework.",
    description: "Allows you to develop your own policies in line with your business. Provides an integrated scalable framework, monitoring the status, start date, and finish date of policies.",
    image: "https://tickitsystems.com.au/wp-content/uploads/2023/07/image-14-1.png",
    features: [
      {
        title: "Policy Archives & Versioning",
        description: "All policies in central location with version control. Demonstrate what policy was effective at any date with easy editing and change tracking capabilities.",
        image: "https://tickitsystems.com.au/wp-content/uploads/2023/07/image-14-1.png"
      },
      {
        title: "Regulation Linking",
        description: "Create policy categories ensuring related policies are grouped together. Attach multiple documents including regulations and company policies.",
        image: "https://tickitsystems.com.au/wp-content/uploads/2023/07/image-14-1.png"
      },
      {
        title: "Global Search",
        description: "Search across any information in the system from any screen, providing quick access to policy information when needed.",
        image: "https://tickitsystems.com.au/wp-content/uploads/2023/07/image-14-1.png"
      }
    ]
  },
  {
    title: "Risk Management",
    shortDescription: "World-leading risk management solution providing enterprise-wide view across all operations.",
    description: "One of the world's leading risk management software solutions. Manage risks while consolidating information to provide an enterprise wide view across all sites, divisions and countries of operation.",
    image: "https://www.tickitondemand.com.au/wp-content/uploads/2021/08/Risk_Register.jpg",
    features: [
      {
        title: "Risk Register",
        description: "Identify and assess risks with effective risk register and complete assessment history. Graphical assessment tools simplify the process while allowing extensive customization.",
        image: "https://www.tickitondemand.com.au/wp-content/uploads/2021/08/Risk_Register.jpg"
      },
      {
        title: "Configurable Dashboard",
        description: "Configurable homepage for each user with elegant graphics displaying vital information. Widgets can be added/removed and configured for user-specific information.",
        image: "https://tickitondemand.com.au/wp-content/uploads/2015/01/dashboard.jpg"
      },
      {
        title: "Risk Mitigation & Action Plans",
        description: "Manage risks with mitigation tasks and action plans. Allocate tasks to staff with due dates and recurring frequencies, with staff sign-off when completed.",
        image: "https://tickitondemand.com.au/wp-content/uploads/2015/01/risk-tasks.png"
      },
      {
        title: "Global Search",
        description: "Search across any information in the system from any screen, providing comprehensive access to risk-related data and documentation.",
        image: "https://tickitondemand.com.au/wp-content/uploads/2015/01/risk-search.png"
      }
    ]
  },
  {
    title: "Contract Lifecycle Management",
    shortDescription: "Robust solution to streamline and automate contract lifecycle from initiation to renewal.",
    description: "Robust solution designed to streamline and automate the lifecycle of contracts and contractor management. Comprehensive tools to manage contracts from initiation to renewal, ensuring compliance, efficiency, and centralized control.",
    image: "https://tickitsystems.com.au/wp-content/uploads/2024/07/contracts-1-2-1024x689.jpg",
    features: [
      {
        title: "Contract Creation & Management",
        description: "Standard templates with customized fields for compliant contract creation. Centralized repository with advanced search capabilities for easy access and management.",
        image: "https://tickitsystems.com.au/wp-content/uploads/2024/07/contracts-1-2-1024x689.jpg"
      },
      {
        title: "Review & Approval Workflows",
        description: "Automate review and approval processes with configurable workflows. Notifications and reminders ensure timely reviews with complete audit trail.",
        image: "https://tickitsystems.com.au/wp-content/uploads/2024/08/Picture1.jpg"
      },
      {
        title: "Contractor Management",
        description: "Streamlined contractor onboarding with license and certification tracking. Performance monitoring and safety compliance questionnaires for legal obligations.",
        image: "https://tickitsystems.com.au/wp-content/uploads/2024/08/Picture1.jpg"
      },
      {
        title: "Compliance & Risk Integration",
        description: "Monitor regulatory compliance and link contracts to risk assessments. Automated renewal alerts and risk mitigation for contract-associated risks.",
        image: "https://tickitsystems.com.au/wp-content/uploads/2024/08/Picture1.jpg"
      }
    ]
  }
];
