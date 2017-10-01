// Enter your git repo url
String gitUrl = "https://github.com/nodecourse98/ShabetzNa-Server"
// Enter the name of your project
String ProjectNmae = "ShabetzNa-Server"
// Enter a name for your job. Should look like = unit-testing-projectname
String JobName = "unit-testing-ShabetzNa-Server"

job(JobName) {
    scm {
        git(gitUrl)
    }
    triggers {
        scm('*/5 * * * *')
    }
    steps {
        shell('npm install')
        shell('npm test')
    }
}

listView(ProjectName) {
    filterBuildQueue()
    filterExecutors()
    jobs {
        name(JobName)
        // regex(/'unit-testing-$project'/)
    }
    jobFilters {
        status {
            status(Status.UNSTABLE)
        }
    }
    columns {
        status()
        weather()
        name()
        lastSuccess()
        lastFailure()
        lastDuration()
        buildButton()
    }
}
