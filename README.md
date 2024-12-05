# CEP4BPMSec

## Prerequisites

Before running the project, ensure that you have the following software installed:

### Global Requirements

1. **Git**
   - For cloning the repository and version control.
   - [Download Git](https://github.com/ajvarela/caise2025/)
   - Verify installation:
     ```bash
     git --version
     ```

2. **Java Development Kit (JDK) 1.8 or higher**
   - Required for the **Engine** module.
   - [Download JDK](https://www.oracle.com/java/technologies/javase-downloads.html)
   - Verify installation:
     ```bash
     java -version
     ```

3. **Apache Maven**
   - Required for building the **Engine** module.
   - [Download Maven](https://maven.apache.org/)
   - Verify installation:
     ```bash
     mvn -version
     ```

4. **Node.js v16 or higher**
   - Required for the **Backend** and **Modeler** modules.
   - [Download Node.js](https://nodejs.org/)
   - Verify installation:
     ```bash
     node -v
     npm -v
     ```

### Module-Specific Requirements

#### Backend

- **Dependencies** are specified in `backend/package.json`.

- **Install Dependencies**:
```bash
cd Backend
npm install
```

#### Modeler

- **Dependencies** are specified in `modeler/package.json`.

- **Install Dependencies**:
```bash
cd Modeler
npm install
```

#### Engine

- **Dependencies** are specified in `engine/pom.xml`.

- **Build the Engine Module**:
```bash
cd Engine
mvn clean install
```

- **Run the Engine Module**:
This will analyze the violations on the scenario located in the folder eventFile
```bash
cd Engine
mvn exec:java
```

## How to Run the Project

Once all prerequisites are installed, you can run the entire project with a single command:

 1. **Navigate to the Root Folder**:
```bash
cd CEP4BPMSec
```

 2. **Run the project**:
On Windows, execute the following command from the root directory:
```bash
./run.bat
```
This script will handle the execution and orchestration of all modules.

## How to Test the Compliance Function

Once the project is running, you should follow this steps to test the compliance function:

 1. **Click on the compliance button**

 2. **Chose between 5, 10 or 20 instance to be diagnosed**
 Only the diagnosis to the provided scenario is available.
  ![Scenario](images/scenario.png)

 3. **Navigate between the three tabs for the different diagnosis**

 4. **Try the modeller**
 The modeller is readily available to test its functions

 5. **Click Deploy Rules**
 Deploy Rules will download the security policies placed in the modeller
