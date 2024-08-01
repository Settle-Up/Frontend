# Settle Up


Settle Up은 단체 모임에서 장기간 발생하는 비용을 정산할 수 있는 웹 애플리케이션입니다. 이 서비스는 그룹의 비용 기록과 분배를 간소화하여 사용자가 신속하고 투명하게 정산을 완료할 수 있도록 돕습니다.

#### 핵심 특징

- **그룹 관리**: 그룹을 생성하고 멤버를 초대하여 공동의 비용을 관리할 수 있습니다.
- **자동 영수증 인식**: 영수증 사진에서 텍스트를 자동으로 추출하여 비용 기록을 간편하게 합니다.
- **정산 최적화**: 지출을 분석하고 거래 횟수를 최소화하여 효율적인 정산을 지원합니다.

<br />
<br />

### 🔗 배포된 웹사이트 : https://d142csekpetioz.cloudfront.net/

<br />
<br />

# 목차

#### [🎥 데모 영상](#-데모-영상)
#### [🔧 기술 스택](#-기술-스택)
#### [📄 상세 기능](#-상세-기능)
#### [📋 프로젝트 관리](#-프로젝트-관리)
#### [👨‍👩‍👦 팀원 소개](#-팀원-소개)

<br />
<br />

## 🎥 데모 영상
[데모 영상 보기](https://d142csekpetioz.cloudfront.net/how-to-use)



<br />



## 🔧 기술 스택
<table>
  <tbody>
    <tr>
      <td><strong>프론트엔드</strong></td>
      <td>
        <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
        <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
        <img src="https://img.shields.io/badge/Material_UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white" alt="Material UI" />
        <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white" alt="React Query" />
        <img src="https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white" alt="Recoil" />
      </td>
    </tr>
    <tr>
      <td><strong>백엔드</strong></td>
      <td>
        <img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white" alt="Java" />
        <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" alt="Spring Boot" />
        <img src="https://img.shields.io/badge/JPA-007396?style=for-the-badge&logo=java&logoColor=white" alt="JPA" />
      </td>
    </tr>
    <tr>
      <td><strong>데이터베이스</strong></td>
      <td>
        <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
        <img src="https://img.shields.io/badge/Redis-D82C20?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
      </td>
    </tr>
    <tr>
      <td><strong>Third-party API</strong></td>
      <td>
        <img src="https://img.shields.io/badge/Kakao_OAuth2-FFCC00?style=for-the-badge&logo=kakao&logoColor=black" alt="Kakao OAuth2" />
        <img src="https://img.shields.io/badge/Microsoft_Azure_AI-0078D4?style=for-the-badge&logo=microsoft-azure&logoColor=white" alt="Microsoft Azure AI" />
      </td>
    </tr>
    <tr>
      <td><strong>배포</strong></td>
      <td>
        <img src="https://img.shields.io/badge/AWS_S3-569A31?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS S3" />
        <img src="https://img.shields.io/badge/AWS_CloudFront-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS CloudFront" />
        <img src="https://img.shields.io/badge/AWS_EC2-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS EC2" />
      </td>
    </tr>
  </tbody>
</table>



<br />



## 📄 상세 기능
### 그룹

- **그룹 생성**: 새로운 그룹을 만들 수 있습니다.
- **그룹 탈퇴**: 그룹에서 탈퇴할 수 있습니다.
- **멤버 초대**: 그룹에 다른 사용자를 초대할 수 있습니다.
    - **초대 알림**: 그룹 초대 시 초대받은 사용자에게 이메일 알림을 보냅니다.
- **월별 소비 요약 보고서**: 매달 그룹이 소비한 내역 요약을 이메일로 받을 수 있는 설정이 가능합니다.

### 지출

- **지출 생성**: 새로운 지출을 기록할 수 있습니다.
    - 영수증 사진을 첨부하면 텍스트를 추출하여 자동으로 정보를 기입합니다.
    - 그룹 내에서 지출에 참여한 멤버를 일부 선택할 수 있습니다.
    - 비용의 배분 방식으로는 균등 배분 또는 차등 배분을 선택할 수 있습니다.
        - **균등 배분**: 동일한 특정 아이템을 소비한 멤버들 사이에서 해당 아이템의 총 비용을 균등하게 부담합니다.
        - **차등 배분**: 동일한 특정 아이템을 소비한 멤버들 사이에서 각자가 소비한 수량에 따라 해당 아이템의 비용을 부담합니다.
- **지출 열람**: 그룹 내의 모든 지출을 최근 날짜 순으로 열람할 수 있습니다. 각 지출은 영수증 내용, 결제자, 배분 방식, 지출에 참여한 각 멤버가 소비한 아이템 내역과, 부담하는 총 값을 보여줍니다.

### 정산

- **자동 정산 및 거래 횟수 최소화**: 그룹 멤버 간의 총 거래 횟수를 최소화하여 효율적인 정산을 구현합니다.
- **정산 거래 표시**: 각 사용자에게 그룹 내에서 정산을 위해 송금해야 할 멤버와 송금할 금액, 그리고 받을 금액과 해당 멤버를 명확히 보여줍니다.

### 송금

- **멤버 간 송금**: 정산 완료를 위해 멤버 간 송금을 지원합니다. *실제 금전 거래가 이루어지는 결제 시스템은 도입되지 않았으며, 송금 과정만을 시뮬레이션합니다.*
- **송금 알림**: 송금을 수신했을 때 앱 내 알림을 통해 사용자에게 통보합니다.

### 사용자 이메일 검색

- 앱 내에서 이메일 검색을 통해 사용자를 찾을 수 있습니다.



<br/>



## 📋 프로젝트 관리
이 프로젝트는 Kanban 방법론과 스크럼의 요소를 결합하여 관리하였습니다. 

- **Kanban 보드 활용**: 프론트엔드와 백엔드 작업을 시각적으로 관리하며 진행 상황을 명확히 파악하고 팀원 간의 작업 상태를 투명하게 공유하였습니다.
- **미팅 관리**: 프로젝트 초기와 중기에는 매일 두 차례의 스크럼 미팅을 통해 팀원 간의 진행 상황을 점검하고, 문제 해결 및 조율을 신속하게 진행하였습니다. 프로젝트 후기에는 Kanban의 유연한 접근 방식을 적용하여 필요할 때만 미팅을 진행하였습니다.
- **작업 우선순위 조정**: 주기적인 검토를 통해 작업 항목의 우선순위를 조정하였습니다. 이를 통해 프로젝트의 목표와 요구사항에 따라 가장 중요한 작업이 우선적으로 처리될 수 있도록 하였습니다.



<br/>



## 👨‍👩‍👦 팀원 소개
<table>
  <tbody>
    <tr>
      <td><strong>프론트엔드</strong></td>
      <td>박수빈</td>
      <td><a href="mailto:sooparksb@gmail.com">sooparksb@gmail.com</a></td>
      <td>
        <a href="https://github.com/sooparkdev">
          <img src="https://img.shields.io/badge/GitHub-ED8B00?style=flat-square&logo=GitHub&logoColor=white" alt="GitHub - 박수빈" style="background-color: #ED8B00;" />
        </a>
      </td>
      <td> 
        - ERD 및 API 설계 <br/>
        - 유저 플로우 설계 <br/>
        - UI/UX 디자인 <br/>
        - 클라이언트 사이드 기능 개발 
      </td>
    </tr>
    <tr>
      <td><strong>백엔드</strong></td>
      <td>서동희</td>
      <td><a href="mailto:seodonghee456@gmail.com">seodonghee456@gmail.com</a></td>
      <td>
        <a href="https://github.com/donghee9">
          <img src="https://img.shields.io/badge/GitHub-00A86B?style=flat-square&logo=GitHub&logoColor=white" alt="GitHub - 서동희" style="background-color: #00A86B;" />
        </a>
      </td>
       <td> 
        - ERD 및 API 설계 <br/>
        - 정산 최적화 로직 설계 <br/>
        - 데이터베이스 관리 <br/>
        - 서버 사이드 기능 개발 
      </td>
    </tr>
  </tbody>
</table>
                                              


<br/>
<br/>
<br/>
<br/>

---

<br/>
<br/>
<br/>
<br/>


# Settle Up

Settle Up is a web application designed to manage and settle long-term expenses in group gatherings. This service simplifies the recording and distribution of group expenses, helping users quickly and transparently complete settlements.

#### Key Features

- **Group Management**: Create groups and invite members to manage shared expenses.
- **Automatic Receipt Recognition**: Extract text from receipt photos to easily record expenses.
- **Settlement Optimization**: Analyze spending and minimize transaction frequency to support efficient settlement.

<br />
<br />

### 🔗 Deployed Website: [https://d142csekpetioz.cloudfront.net/](https://d142csekpetioz.cloudfront.net/)

<br />
<br />

# Table of Contents

#### [🎥 Demo Video](#-demo-video)
#### [🔧 Tech Stack](#-tech-stack)
#### [📄 Detailed Features](#-detailed-features)
#### [📋 Project Management](#-project-management)
#### [👨‍👩‍👦 Team Members](#-team-members)

<br />
<br />

## 🎥 Demo Video
[Watch the Demo Video](https://d142csekpetioz.cloudfront.net/how-to-use)

<br />

## 🔧 Tech Stack
<table>
  <tbody>
    <tr>
      <td><strong>Frontend</strong></td>
      <td>
        <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
        <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
        <img src="https://img.shields.io/badge/Material_UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white" alt="Material UI" />
        <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white" alt="React Query" />
        <img src="https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white" alt="Recoil" />
      </td>
    </tr>
    <tr>
      <td><strong>Backend</strong></td>
      <td>
        <img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white" alt="Java" />
        <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" alt="Spring Boot" />
        <img src="https://img.shields.io/badge/JPA-007396?style=for-the-badge&logo=java&logoColor=white" alt="JPA" />
      </td>
    </tr>
    <tr>
      <td><strong>Database</strong></td>
      <td>
        <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
        <img src="https://img.shields.io/badge/Redis-D82C20?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
      </td>
    </tr>
    <tr>
      <td><strong>Third-party API</strong></td>
      <td>
        <img src="https://img.shields.io/badge/Kakao_OAuth2-FFCC00?style=for-the-badge&logo=kakao&logoColor=black" alt="Kakao OAuth2" />
        <img src="https://img.shields.io/badge/Microsoft_Azure_AI-0078D4?style=for-the-badge&logo=microsoft-azure&logoColor=white" alt="Microsoft Azure AI" />
      </td>
    </tr>
    <tr>
      <td><strong>Deployment</strong></td>
      <td>
        <img src="https://img.shields.io/badge/AWS_S3-569A31?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS S3" />
        <img src="https://img.shields.io/badge/AWS_CloudFront-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS CloudFront" />
        <img src="https://img.shields.io/badge/AWS_EC2-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS EC2" />
      </td>
    </tr>
  </tbody>
</table>

<br />

## 📄 Detailed Features
### Group

- **Create Group**: Create a new group.
- **Leave Group**: Leave a group.
- **Invite Members**: Invite other users to the group.
    - **Invitation Notifications**: Send email notifications to invited users when they are invited to a group.
- **Monthly Consumption Summary Report**: Set up to receive a summary of the group's monthly expenses via email.

### Expenses

- **Create Expense**: Record a new expense.
    - Attach a receipt photo to automatically extract text and fill in the information.
    - Select members who participated in the expense within the group.
    - Choose between equal or proportional distribution of costs.
        - **Equal Distribution**: Share the total cost of an item equally among members who consumed it.
        - **Proportional Distribution**: Share the cost of an item based on the quantity consumed by each member.
- **View Expenses**: View all expenses within the group in reverse chronological order. Each expense shows receipt details, the payer, distribution method, item details, and total amount each member owes.

### Settlement

- **Automatic Settlement and Minimization of Transactions**: Implement efficient settlement by minimizing the total number of transactions between group members.
- **Settlement Transactions Display**: Clearly show each user who they need to send money to, how much to send, and how much they will receive from each member.

### Transfers

- **Member Transfers**: Support transfers between members for settlement. *No actual monetary transactions are implemented; only the simulation of the transfer process.*
- **Transfer Notifications**: Notify users through in-app alerts when a transfer is received.

### User Email Search

- Search for users within the app using email.

<br />

## 📋 Project Management
This project was managed using a combination of Kanban methodology and Scrum elements.

- **Kanban Board**: Visually manage frontend and backend tasks, track progress, and transparently share the status of tasks among team members.
- **Meeting Management**: Conducted two Scrum meetings daily during the early and middle stages of the project to check progress, resolve issues, and make adjustments quickly. In the later stages, applied Kanban’s flexible approach and held meetings only as needed.
- **Task Prioritization**: Regularly reviewed and adjusted task priorities to ensure that the most important tasks were handled first, based on the project's goals and requirements.

<br />

## 👨‍👩‍👦 Team Members
<table>
  <tbody>
    <tr>
      <td><strong>Frontend</strong></td>
      <td>Park Subin</td>
      <td><a href="mailto:sooparksb@gmail.com">sooparksb@gmail.com</a></td>
      <td>
        <a href="https://github.com/sooparkdev">
          <img src="https://img.shields.io/badge/GitHub-ED8B00?style=flat-square&logo=GitHub&logoColor=white" alt="GitHub - Park Subin" style="background-color: #ED8B00;" />
        </a>
      </td>
      <td> 
        - ERD and API Design <br/>
        - User Flow Design <br/>
        - UI/UX Design <br/>
        - Client-side Feature Development 
      </td>
    </tr>
    <tr>
      <td><strong>Backend</strong></td>
      <td>Seo Donghee</td>
      <td><a href="mailto:seodonghee456@gmail.com">seodonghee456@gmail.com</a></td>
      <td>
        <a href="https://github.com/donghee9">
          <img src="https://img.shields.io/badge/GitHub-00A86B?style=flat-square&logo=GitHub&logoColor=white" alt="GitHub - Seo Donghee" style="background-color: #00A86B;" />
        </a>
      </td>
       <td> 
        - ERD and API Design <br/>
        - Settlement Optimization Logic Design <br/>
        - Database Management <br/>
        - Server-side Feature Development 
      </td>
    </tr>
  </tbody>
</table>
