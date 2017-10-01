// Enter your git repo Urldd.
def gitUrl = "https://github.com/nodecourse98/ShabetzNa-Server"
// Enter the name of your project
def ProjectName = "ShabetzNa-Server"
// Enter a name for your job. Should look like = unit-testing-projectname
def JobName = "unit-testing-ShabetzNa-Server"

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
    description('Jobs')
    filterBuildQueue()
    filterExecutors()
    jobs {
        name(JobName)
//        regex(//)
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
