# Settle Up


Settle Up은 단체 모임에서 장기간 발생하는 비용을 정산할 수 있는 웹 애플리케이션입니다. 이 서비스는 그룹의 비용 기록과 분배를 간소화하여 사용자가 신속하고 투명하게 정산을 완료할 수 있도록 돕습니다.
배포된 웹사이트는 [여기](https://d142csekpetioz.cloudfront.net/login)에서 확인할 수 있습니다.

<br/>

## 주요 특징

- **그룹 관리**: 그룹을 생성하고 멤버를 초대하여 공동의 비용을 관리할 수 있습니다.
- **자동 영수증 인식**: 영수증 사진에서 텍스트를 자동으로 추출하여 비용 기록을 간편하게 합니다.
- **정산 최적화**: 지출을 분석하고 거래 횟수를 최소화하여 효율적인 정산을 지원합니다.

<br/>

## 팀원

### [박수빈](https://github.com/sooparkdev) | 프론트엔드 개발자

- 역할:
    - ERD 및 API 설계
    - 유저 플로우 설계
    - UI/UX 디자인
    - 클라이언트 사이드 기능 개발

### [서동희](https://github.com/donghee9) | 백엔드 개발자

- 역할:
    - ERD 및 API 설계
    - 정산 최적화 로직 설계
    - 데이터베이스 관리
    - 서버 사이드 기능 개발

<br/>

## 데모 영상

[데모 영상 보기](https://d142csekpetioz.cloudfront.net/how-to-use)

<br/>

## 기술 스택

| **분류**      | **기술**                                                      |
|---------------|--------------------------------------------------------------|
| **프론트엔드** | React, TypeScript, Material UI, React Query, Recoil          |
| **백엔드**    | Java, Spring Boot, JPA                                        |
| **데이터베이스** | MySQL, Redis                                                  |
| **외부 API**  | Kakao OAuth2, Microsoft Azure AI Document Intelligence                      |
| **배포**      | AWS S3, AWS CloudFront, AWS EC2                               |
| **버전 관리** | Git, GitHub                                                   |

<br/>

## 기능 상세

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

## 프로젝트 관리

이 프로젝트는 Kanban 방법론과 스크럼의 요소를 결합하여 관리하였습니다. 주요 관리 방식을 아래와 같이 적용하였습니다.

- **Kanban 보드 활용**: 프론트엔드와 백엔드 작업을 시각적으로 관리하며 진행 상황을 명확히 파악하고 팀원 간의 작업 상태를 투명하게 공유하였습니다.
- **미팅 관리**: 프로젝트 초기와 중기에는 매일 두 차례의 스크럼 미팅을 통해 팀원 간의 진행 상황을 점검하고, 문제 해결 및 조율을 신속하게 진행하였습니다. 프로젝트 후기에는 Kanban의 유연한 접근 방식을 적용하여 필요할 때만 미팅을 진행하였습니다.
- **작업 우선순위 조정**: 주기적인 검토를 통해 작업 항목의 우선순위를 조정하였습니다. 이를 통해 프로젝트의 목표와 요구사항에 따라 가장 중요한 작업이 우선적으로 처리될 수 있도록 하였습니다.

<br/>
<br/>
<br/>

---

<br/>
<br/>
<br/>

Settle Up is a web application designed to manage and settle expenses over a prolonged period in group settings. This service simplifies the recording and distribution of group expenses, helping users settle up quickly and transparently. The deployed website can be found [here](https://d142csekpetioz.cloudfront.net/login).

<br/>

## Key Features

- **Group Management**: Create groups and invite members to manage shared expenses.
- **Automatic Receipt Recognition**: Extract text from receipt photos to easily record expenses.
- **Settlement Optimization**: Analyze expenditures and minimize transaction counts for efficient settlement.

<br/>

## Team Members

### [Soo Bin Park](https://github.com/sooparkdev) | Frontend Developer

- Responsibilities:
    - ERD and API design
    - User flow design
    - UI/UX design
    - Client-side feature development

### [Dong Hee Seo](https://github.com/donghee9) | Backend Developer

- Responsibilities:
    - ERD and API design
    - Settlement optimization logic design
    - Database management
    - Server-side feature development

<br/>

## Demo Video

[Watch the Video](https://d142csekpetioz.cloudfront.net/how-to-use)

<br/>

## Tech Stack

| **Category**     | **Technologies**                                          |
|------------------|-----------------------------------------------------------|
| **Frontend**     | React, TypeScript, Material UI, React Query, Recoil       |
| **Backend**      | Java, Spring Boot, JPA                                    |
| **Database**     | MySQL, Redis                                              |
| **External API** | Kakao OAuth2, Microsoft Azure AI Document Intelligence                  |
| **Deployment**   | AWS S3, AWS CloudFront, AWS EC2                           |
| **Version Control** | Git, GitHub                                            |

<br/>

## Detailed Features

### Group

- **Create Group**: Create a new group.
- **Leave Group**: Leave an existing group.
- **Invite Members**: Invite users to the group.
    - **Invitation Notifications**: Sends email notifications to invited users.
- **Monthly Expense Summary Reports**: Configure to receive monthly summary reports of group expenses via email.

### Expenses

- **Create Expense**: Record a new expense.
    - Attach receipt photos to auto-fill information.
    - Select specific members within the group to participate in the expense.
    - Choose between equal or differential distribution methods.
        - **Equal Distribution**: Share the total cost of a specific item equally among the participating members.
        - **Differential Distribution**: Share the cost based on each member's consumption of a specific item.
- **View Expenses**: View all group expenses sorted by recent date. Each expense displays receipt details, payer, distribution method, itemized member consumption, and total amount owed.

### Settlement

- **Automatic Settlement and Transaction Minimization**: Implement efficient settlements by minimizing total transactions among group members.
- **Settlement Transaction Display**: Clearly shows each user the members they need to send money to, the amount, and the members they will receive money from.

### Transfers

- **Member-to-Member Transfers**: Support transfers between members for settlement. *Note: This simulates the transfer process without actual financial transactions.*
- **Transfer Notifications**: Notify users via in-app alerts when transfers are received.

### User Email Search

- Search for users by email within the app.

<br/>

## Project Management

This project was managed using a combination of Kanban methodology and Scrum elements. Key management practices include:

- **Utilizing Kanban Board**: Visually manage frontend and backend tasks to clearly understand progress and transparently share the status among team members.
- **Meeting Management**: Held twice-daily Scrum meetings during the initial and mid-stages of the project to review progress, address issues, and coordinate quickly. Adopted a flexible Kanban approach for meetings in the latter stages, holding them as needed.
- **Task Prioritization**: Regular reviews to adjust task priorities, ensuring the most important tasks aligned with project goals and requirements were addressed first.
